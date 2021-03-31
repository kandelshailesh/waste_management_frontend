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

export const EmployeeForm = props => {
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
    fullName: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    gender: 'male',
    type: 'normal',
    post: '',
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
  } = useFormValidation(initialValues, UserSchema, submitForm);

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
      ? await props.editEmployee(data.id, formData)
      : await props.createEmployee(formData);
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
      key: 'fullName',
      name: 'fullName',
      label: 'Full Name',
      rules: [{ required: true, message: 'Please enter full name' }],
      type: (
        <Input
          name='fullName'
          value={values.fullName}
          placeholder='Please enter full name'
        />
      ),
      error: errors.fullName,
    },
    {
      key: 'post',
      name: 'post',
      label: 'Post',
      rules: [{ required: true, message: 'Please enter post' }],
      type: (
        <Input
          name='post'
          value={values.post}
          placeholder='Please enter post'
        />
      ),
      error: errors.post,
    },
    {
      key: 'email',
      name: 'email',
      label: 'Email',
      rules: [{ required: true, message: 'Please enter email' }],
      type: (
        <Input
          value={values.email}
          name='email'
          placeholder='Please enter email '
        />
      ),
      error: errors.email,
    },
    {
      key: 'phone',
      name: 'phone',
      label: 'Phone',
      rules: [{ required: true, message: 'Please enter Phone' }],
      type: (
        <Input
          value={values.phone}
          type='text'
          name='phone'
          placeholder='Please enter Phone '
        />
      ),
      error: errors.phone,
    },
    {
      key: 'address',
      label: 'Address',
      rules: [{ required: true, message: 'Please enter addres' }],
      type: (
        <Input
          type='text'
          name='addres'
          value={values.address}
          placeholder='Please enter address'
          name='address'
        />
      ),
      error: errors.address,
    },
    {
      type: (
        <Radio.Group
          value={values.gender}
          name='gender'
          defaultValue='male'
          buttonStyle='solid'
        >
          <Radio.Button
            checked={values.gender === 'male'}
            style={{ marginRight: 10 }}
            value='male'
          >
            Male
          </Radio.Button>
          <Radio.Button checked={values.gender === 'female'} value='female'>
            Female
          </Radio.Button>
          <Radio.Button
            checked={values.gender === 'other'}
            style={{ marginRight: 10 }}
            value='other'
          >
            Other
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'gender',
      label: 'Gender',
      error: errors.gender,
    },

    {
      type: (
        <Radio.Group name='type' defaultValue='normal' buttonStyle='solid'>
          <Radio.Button checked={values.type === 'normal'} value='normal'>
            Normal
          </Radio.Button>
          <Radio.Button checked={values.type === 'pickup'} value='pickup'>
            Pickup
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'type',
      label: 'Employee Type',
      error: errors.type,
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
