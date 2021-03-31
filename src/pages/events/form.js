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
import { EventSchema } from '../../_utils/Schemas';
import isEmpty from 'lodash/isEmpty';
import { getBaseName, getFormData } from '../../_utils/index';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

export const EventForm = props => {
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
    start_time: null,
    status: 'active',
    title: '',
    description: '',
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
  } = useFormValidation(initialValues, EventSchema, submitForm);

  useEffect(() => {
    if (clicked) {
      validateForm();
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
    const contentType = 'JSON';

    const formData =
      contentType === 'JSON'
        ? JSON.stringify(values)
        : await getFormData(values);

    const a = data
      ? await props.editEvent(data.id, formData)
      : await props.createEvent(formData);
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
        <DatePicker
          format='YYYY/MM/DD HH:mm'
          value={values.start_time ? moment(values.start_time) : null}
          name='start_time'
          // allowClear={true}
          showToday
          showTime
          // defaultPickerValue={moment(values.publishedDate)}
          // value={moment(values.publishedDate)}
          onChange={val => {
            setValues(prev => ({
              ...prev,
              start_time: moment(val).format('YYYY/MM/DD HH:mm'),
            }));
          }}
        />
      ),
      key: 'start_time',
      label: 'Start DateTime',
      error: errors.start_time,
    },

    {
      key: 'description',
      name: 'description',
      label: 'Description',
      rules: [{ required: true, message: 'Please enter description' }],
      type: (
        <Input.TextArea
          rows='4'
          name='description'
          value={values.description}
          placeholder='Enter description'
        />
      ),
      error: errors.description,
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
