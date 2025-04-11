import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import Error from './Error';
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch';
import { login, signup } from '@/db/apiAUth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: null,
  });

  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.click();
  };

  const [errors, setErrors] = useState([]);
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Email is required'),
        email: Yup.string()
          .email('Invalid Email')
          .required('Email is required'),
        password: Yup.string()
          .min('6', 'Password must be atleast 6 characters')
          .required('Email is required'),
        profile_pic: Yup.mixed().required('Profile picture is required'),
      });
      await schema.validate(formData, { abortEarly: false });

      await fnSignup();
    } catch (error) {
      const newError = {};

      error?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);

  const { fetchUser } = UrlState();
  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
      fetchUser();
    }
  }, [data, error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className="space-y-1">
          <div className='flex flex-col justify-center items-center'>
            <button
              type="button"
              onClick={handleClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer"
            >
              Upload Profile Picture
            </button>

            <input
              className=''
              ref={inputRef}
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : 'Login'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;
