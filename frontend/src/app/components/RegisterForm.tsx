'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from './Form';
import Input from './Input';
import Button from './Button';

export default function RegisterForm(){
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        program: '',
        year_of_study: '',
        confirm_password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        if (form.password !== form.confirm_password) {
            alert('Passwords do not match');
            return;
        }

        if (form.password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (!form.email || !form.first_name || !form.last_name || !form.program || !form.year_of_study) {
            alert('All fields are required');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert('Registration successful! Please login.');
                router.push('/student/login');
            } else {
                const { error } = await res.json();
                alert(error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form handleSubmit={handleSubmit}>
            <div className="p-4">
                <p className="text-5xl font-bold text-green-950 text-center mt-2 mb-6">Register</p>    
                <Input
                    label="First Name"
                    type="text"
                    name="first_name"
                    placeholder="Enter first name" 
                    onChange={handleChange}
                    value={form.first_name}
                />
                <Input
                    label="Last Name"
                    type="text"
                    name="last_name"
                    placeholder="Enter last name"
                    onChange={handleChange}
                    value={form.last_name}
                />
                <Input
                    label="Program"
                    type="text"
                    name="program" 
                    placeholder="Enter your program" 
                    onChange={handleChange}
                    value={form.program}
                />
                <Input
                    label="Year of Study"
                    type="number"
                    name="year_of_study"
                    placeholder="Enter your year of study (1,2,..)"
                    onChange={handleChange}
                    value={form.year_of_study}
                />
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email" 
                    onChange={handleChange}
                    value={form.email}
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Choose your password"
                    onChange={handleChange}
                    value={form.password}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    placeholder="Enter password again"
                    onChange={handleChange} 
                    value={form.confirm_password}
                />

                <Button value={isLoading ? "Registering..." : "Register"} disabled={isLoading}/>
                <p className="text-gray-400 text-center mt-2 font-sans text-sm">
                    Already have an account? <a href="/student/login" className="text-blue-800">Login</a>      
                </p>
            </div>
        </Form>
    )
} 