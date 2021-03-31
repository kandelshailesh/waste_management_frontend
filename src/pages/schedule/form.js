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
import { ScheduleSchema } from '../../_utils/Schemas';
import isEmpty from 'lodash/isEmpty';
import { getBaseName, getFormData } from '../../_utils/index';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

export const ScheduleForm = props => {
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
    status: 'uncollected',
    title: '',
    remarks: '',
    user_id: null,
    collection_date: null,
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
  } = useFormValidation(initialValues, ScheduleSchema, submitForm);

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
    const contentType = 'JSON';

    const formData =
      contentType === 'JSON'
        ? JSON.stringify(values)
        : await getFormData(values);

    const a = data
      ? await props.editSchedule(data.id, formData)
      : await props.createSchedule(formData);
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
          placeholder='Select User'
          onChange={val => setValues(a => ({ ...a, user_id: val }))}
          name='user_id'
        >
          {props.users.map(result => (
            <Select.Option value={result.id}>{result.fullName}</Select.Option>
          ))}
        </Select>
      ),
      key: 'user_id',
      label: 'Select User',
      error: errors.user_id,
    },
    {
      type: (
        <DatePicker
          format='YYYY/MM/DD HH:mm '
          name='collection_date'
          value={values.collection_date ? moment(values.collection_date) : null}
          allowClear={true}
          showToday
          showTime
          style={{ width: '100%' }}
          onChange={val => {
            setValues(prev => ({
              ...prev,
              collection_date: moment(val).format('YYYY/MM/DD HH:mm'),
            }));
          }}
        />
      ),
      key: 'collection_date',
      label: 'Collection Time',
      error: errors.collection_date,
    },
    {
      type: (
        <Radio.Group
          value={values.status}
          name='status'
          defaultValue='uncollected'
          buttonStyle='solid'
        >
          <Radio.Button
            checked={values.status === 'collected'}
            style={{ marginRight: 10 }}
            value='collected'
          >
            Collected
          </Radio.Button>
          <Radio.Button
            checked={values.status === 'uncollected'}
            value='uncollected'
          >
            Uncollected
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },

    {
      key: 'remarks',
      name: 'remarks',
      label: 'Remarks',
      rules: [{ required: true, message: 'Please enter remarks' }],
      type: (
        <Input.TextArea
          rows='4'
          name='remarks'
          value={values.remarks}
          placeholder='Enter remark'
        />
      ),
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
