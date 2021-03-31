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
  DatePicker,
} from 'antd';
import useUpload from 'hooks/useUpload';
import { ComplaintSchema } from '../../_utils/Schemas';
import isEmpty from 'lodash/isEmpty';
import { getBaseName, getFormData } from '../../_utils/index';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

export const ComplaintForm = props => {
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
    status: 'pending',
    title: '',
    description: '',
    location: '',
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
  } = useFormValidation(initialValues, ComplaintSchema, submitForm);

  useEffect(() => {
    if (clicked) {
      validateForm();
      //submitForm();
    }
  }, [clicked]);

  useEffect(() => {
    console.log('done', data);
    if (!isEmpty(data)) {
      setValues({
        ...data,
      });
      console.log('values', values);
    } else {
      setValues({ ...initialValues });
    }
  }, [data]);

  const fetchSubmit = async () => {
    const contentType = '';

    const formData =
      contentType === 'JSON'
        ? JSON.stringify(values)
        : await getFormData(values);

    const a = data
      ? await props.editComplaint(data.id, formData)
      : await props.createComplaint(formData);
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
      type: (
        <Select
          value={values.user_id}
          onChange={val => setValues(a => ({ ...a, user_id: val }))}
          placeholder='Select User'
          name='user_id'
        >
          {props.users.map(result => (
            <Select.Option value={result.id}>
              {result?.fullName || ''}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'user_id',
      label: 'Select User',
      error: errors.user_id,
    },
    {
      key: 'title',
      name: 'title',
      label: 'Title',
      error: errors.title,
      rules: [{ required: true, message: 'Please enter title' }],
      type: (
        <Input
          name='title'
          value={values.title}
          placeholder='Please enter title'
        />
      ),
    },
    {
      key: 'description',
      name: 'description',
      label: 'Description',
      error: errors.description,
      rules: [{ required: true, message: 'Please enter description' }],
      type: (
        <Input.TextArea
          rows='4'
          name='description'
          value={values.description}
          placeholder='Enter description'
        />
      ),
    },
    {
      type: (
        <Input
          name='location'
          value={values.location}
          placeholder='Please enter location'
        />
      ),
      key: 'location',
      label: 'Location',
      error: errors.location,
    },
    {
      label: 'Image',
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
      type: (
        <Radio.Group
          value={values.status}
          name='status'
          defaultValue='pending'
          buttonStyle='solid'
        >
          <Radio.Button
            checked={values.status === 'pending'}
            style={{ marginRight: 10 }}
            value='pending'
          >
            Pending
          </Radio.Button>
          <Radio.Button checked={values.status === 'resolved'} value='resolved'>
            Resolved
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
