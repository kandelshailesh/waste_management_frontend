import React, { useEffect } from 'react';
import useFormValidation from 'hooks/useFormValidation';
import { STRINGS } from '_constants';
import {
  Form,
  Button,
  Input,
  Select,
  InputNumber,
  Upload,
  Radio,
  notification,
  message,
} from 'antd';
import useUpload from 'hooks/useUpload';
import { BlogSchema } from '../../_utils/Schemas';
import isEmpty from 'lodash/isEmpty';
import { getBaseName, getFormData } from '../../_utils/index';
import { UploadOutlined } from '@ant-design/icons';
import Editor from 'components/Editor';

export const BlogForm = props => {
  const {
    data,
    id,
    setId,
    setData,
    setsubmitting,
    setvisible,
    clicked,
    setclicked,
  } = props;

  const initialValues = {
    status: 'active',
    description: '',
    title: '',
    author_id: 1,
  };
  const {
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
    setFileList: setFileListMain,
  } = useUpload(1);

  const propsMainImage = {
    listType: 'picture',
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
  };

  const handleEditorChange = e => {
    setValues(a => ({
      ...a,
      description: e,
    }));
  };

  const submitForm = () => {
    try {
      console.log('will submitform', values);
      fetchSubmit();
      setclicked(false);
    } catch (err) {
      setSubmitting(false);
      setsubmitting(false);
      setclicked(false);
    }
  };

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    validateForm,
  } = useFormValidation(initialValues, BlogSchema, submitForm);

  useEffect(() => {
    if (clicked) {
      validateForm();
      //submitForm();
    }
  }, [clicked]);

  useEffect(() => {
    console.log('done', data);
    if (!isEmpty(data)) {
      if (data.image) {
        const image = [
          {
            uid: '-1',
            url: data.image,
            name: getBaseName(data.image),
            thumbUrl: data.image,
          },
        ];
        setFileListMain(image);
      }
      setValues({
        ...data,
      });
      console.log('values', values);
    } else {
      setValues({ ...initialValues });
      setFileListMain([]);
    }
  }, [data]);

  useEffect(() => {
    if (fileListMain) setValues(a => ({ ...a, image: fileListMain }));
  }, [fileListMain]);
  const fetchSubmit = async () => {
    console.log('Values', values);

    const { image, ...rest } = values;
    const formData = await getFormData(rest);
    if (image && Array.isArray(image) && image.length > 0) {
      formData.append('image', image[0].originFileObj);
    }

    const a = data
      ? await props.editBlog(data.id, formData)
      : await props.createBlog(formData);
    console.log('a', a);
    setSubmitting(false);
    setsubmitting(false);
    if (!a.error) {
      setvisible(false);
      setId('');
      setData('');
    } else {
      message.error(a.message);
    }
  };
  const formItems = [
    {
      label: 'Thumbnail',
      error: errors.image,
      key: 'image',
      name: 'image',
      type: (
        <>
          <Upload listType='picture-card' name='image' {...propsMainImage}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <UploadOutlined /> Select Image
            </Button>
          </Upload>
        </>
      ),
    },
    {
      key: 'title',
      name: 'title',
      label: 'Title',
      rules: [{ required: true, message: 'Please enter title' }],
      type: (
        <Input
          name='title'
          value={values.title}
          placeholder='Please enter title'
        />
      ),
      error: errors.title,
    },
    {
      type: (
        <Editor
          placeholder='Write something...'
          editorHtml={values.description || ''}
          onChange={handleEditorChange}
        />
      ),
      label: 'Content',
      error: errors.description,
      key: 'description',
    },

    {
      type: (
        <Radio.Group
          value={values.status}
          name='status'
          defaultValue='active'
          buttonStyle='solid'
        >
          <Radio.Button
            checked={values.status === 'active'}
            style={{ marginRight: 10 }}
            value='active'
          >
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value='hold'>
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
  ];

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign='right'
      layout='vertical'
    >
      {formItems.map(item => {
        if (item?.editDisable && data) {
        } else if (item.heading)
          return (
            <h4 key={item.heading} className='text-black mb-3'>
              <strong>{item.heading}</strong>
            </h4>
          );
        else
          return (
            <Form.Item
              key={item.key}
              label={item.label}
              validateStatus={item.error && 'error'}
              help={item.error}
            >
              {item.type}
            </Form.Item>
          );
      })}
    </Form>
  );
};
