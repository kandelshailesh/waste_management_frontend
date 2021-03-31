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

export const UserForm = props => {
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
    password: '',
    phone: '',
    address: '',
    subscribed: 'false',
    status: 'active',
    activation_date: '',
    renewal_date: '',
    subscription_id: '',
    isAdmin: 'false',
    gender: 'male',
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
    console.log('Hello');
    if (fileListMain) setValues(a => ({ ...a, image: fileListMain }));
  }, [fileListMain]);
  const fetchSubmit = async () => {
    console.log('Values', values);

    const { image, ...rest } = values;
    const formData = await getFormData(rest);
    if (Array.isArray(image)) {
      formData.append('image', image[0].originFileObj);
    }
    if (values?.image && values?.image[0]?.originFileObj) {
      formData.append('delete_profile', data.deleteImage);
    }
    const a = data
      ? await props.editUser(data.id, formData)
      : await props.createUser(formData);
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
      key: 'username',
      name: 'username',
      label: 'Username',
      rules: [{ required: true, message: 'Please enter user name' }],
      type: (
        <Input
          value={values.username}
          name='username'
          placeholder='Please enter user name'
        />
      ),
      error: errors.username,
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
      key: 'password',
      name: 'password',
      label: 'Password',
      rules: [{ required: true, message: 'Please enter user name' }],
      type: (
        <Input
          type='password'
          value={values.password}
          placeholder='Please enter password'
          name='password'
        />
      ),
      error: errors.password,
      editDisable: true,
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
    {
      type: (
        <Radio.Group
          value={values.isAdmin.toString()}
          name='isAdmin'
          defaultValue={'false'}
          buttonStyle='solid'
        >
          <Radio.Button
            checked={values.isAdmin == 'true'}
            style={{ marginRight: 10 }}
            value={'true'}
          >
            Admin
          </Radio.Button>
          <Radio.Button checked={values.isAdmin == 'false'} value={'false'}>
            User
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'isAdmin',
      label: 'Usertype',
      error: errors.isAdmin,
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
