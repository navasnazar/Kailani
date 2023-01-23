import React from 'react'
import './nav.css'
import {Link} from 'react-router-dom'
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {TiMessages} from 'react-icons/ti'
import {TfiGallery} from 'react-icons/tfi'
import { useState } from 'react'
import {FiGrid} from 'react-icons/fi'
import axios from 'axios'
import { LockOutlined, UserOutlined } from '@ant-design/icons';

//Registration details
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal
} from 'antd';
// import "antd/dist/antd.css";
import { QuestionCircleOutlined } from '@ant-design/icons';
//registration details end....


const HomeNav = () => {
  const [activeNav, setActiveNav]=useState('#')
  const [loginVisible, setLoginVisible]=useState(false);
  const [navActive, setNavActive]=useState(true)

  console.log(activeNav);

  // login section start
  const registerCall = ()=>{
    
    setVisible(false)
    setLoginVisible(true)
    setNavActive(false)
    console.log('login call done');
    
   
    
  }
  

  //forms functions start........


  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [visible, setVisible] = useState(false);
  


  //koduth vitt - start
  const onCreate = async (values) => {
    console.log('Received values of form yyyy: ', values);
    const response = await axios.post('http://localhost:8000/admin/register',values).then((res)=>{
      let resData = res.data
      console.log(resData);
    })
    setVisible(false);
  };
  //koduth vitt - end



  // Register form start.......
  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values of form xxx: ', values);
    };

    return (
      <div>
        <Modal
        visible={visible}
        title="Register"
        okText="Register"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            className='email'
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label={
              <span>
                Full Name 
                
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
            
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

        </Form>
        <div className='loginSection'>
        </div>
        
        <div>
          <p>Already Register ? <Link onClick={registerCall} style={{color:'blue'}}> Login</Link></p>
        </div>
        </Modal>
      </div>
    );
  }
  //Register form end......










  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };


  const setNavFunction = ()=>{
    setLoginVisible(false)
    setNavActive(true)
  }



  return (
    <nav>
      <div>
        {
          navActive ? 
            <div className='navBar_style'>
                <a href='#'
                  onClick={()=>setActiveNav('#')} 
                  className={activeNav === '#' ? 'active' : ''}>
                    <AiOutlineHome/>
                </a>
                
                <div>
                <Button className='registerButton'
                        type=''
                        onClick={() => {
                          setVisible(true);
                        }}
                      >
                  <AiOutlineUser/>
                        
                    </Button>
                      <CollectionCreateForm
                      className='formReg'
                        visible={visible}
                        onCreate={onCreate}
                        onCancel={() => {
                          setVisible(false);
                        }}
                      />
                </div>

                <a href="#services"
                  onClick={()=>setActiveNav('#services')} 
                  className={activeNav === '#services' ? 'active' : ''}>
                  <RiServiceLine/>
                </a>
                <a href="#contact"
                  onClick={()=>setActiveNav('#contact')} 
                  className={activeNav === '#contact' ? 'active' : ''}>
                  <TiMessages/>
                </a>
                
                <Link to="/gallery">
                <TfiGallery/></Link>

                <Link to="/booking">
                <FiGrid/></Link>
            </div>

          : ''
        }
      </div>
      

      <div>
        {loginVisible ?
            <Form
            visible={loginVisible}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}

            <Form.Item>
              <Button  type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
           
            <Form.Item>
              <div className='login_back'>
                  <a onClick={setNavFunction}> Back</a>
              </div>
            </Form.Item>

            
          </Form>
        : ''}
        </div>

    </nav>
  )
}

export default HomeNav