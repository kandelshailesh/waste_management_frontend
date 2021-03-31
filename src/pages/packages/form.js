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
import { UserSchema } from '../../_utils/Schemas';
import isEmpty from 'lodash/isEmpty';
import { getBaseName, getFormData } from '../../_utils/index';
import { UploadOutlined } from '@ant-design/icons';

export const PackageForm = props => {
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
    unit: 'days',
    duration: '',
    details: '',
    name: '',
    cost: '',
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
  } = useFormValidation(initialValues, UserSchema, submitForm);

  useEffect(() => {
    if (clicked) {
      submitForm();
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
      ? await props.editPackage(data.id, formData)
      : await props.createPackage(formData);
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
      key: 'name',
      name: 'name',
      label: 'Package Name',
      rules: [{ required: true, message: 'Please enter package name' }],
      type: (
        <Input
          name='name'
          value={values.name}
          placeholder='Please enter package name'
        />
      ),
    },

    {
      key: 'cost',
      name: 'cost',
      label: 'Cost',

      rules: [{ required: true, message: 'Please enter cost' }],
      type: (
        <InputNumber
          name='cost'
          value={values.cost}
          style={{ width: '100%' }}
          placeholder='Please enter cost '
        />
      ),
    },
    {
      key: 'duration',
      name: 'duration',
      label: 'Duration',
      rules: [{ required: true, message: 'Please enter duration' }],
      type: (
        <InputNumber
          name='duration'
          value={values.duration}
          type='text'
          style={{ width: '100%' }}
          placeholder='Please enter duration '
        />
      ),
    },
    {
      type: (
        <Select
          defaultActiveFirstOption={false}
          showArrow={true}
          filterOption={false}
          // onChange={handleChange}
          // onSearch={handleSearch}
          value={values.unit}
          name='unit'
          placeholder='Unit'
        >
          <Select.Option value='days' key='days'>
            Days
          </Select.Option>
          <Select.Option value='months' key='months'>
            Months
          </Select.Option>
          <Select.Option value='years' key='years'>
            Years
          </Select.Option>
        </Select>
      ),
      key: 'unit',
      label: 'Unit',
      // error: errors.location,
    },
    {
      key: 'details',
      name: 'details',
      label: 'Description',
      rules: [{ required: true, message: 'Please enter description' }],
      type: (
        <Input.TextArea
          name='details'
          value={values.details}
          rows={4}
          placeholder='Enter description'
        />
      ),
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
