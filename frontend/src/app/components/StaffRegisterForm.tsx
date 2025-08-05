'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from './Form';
import Input from './Input';
import Button from './Button';

export default function StaffRegisterForm(){
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        department: '',
        position: '',
        employee_id: '',
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

        if (!form.email || !form.first_name || !form.last_name || !form.department || !form.position || !form.employee_id) {
            alert('All fields are required');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/staff/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert('Registration successful! Please login.');
                router.push('/staff/login');
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
                <p className="text-5xl font-bold text-blue-950 text-center mt-2 mb-6">Staff Registration</p>
                <Input 
                    label="First Name" 
                    type="text" 
                    name="first_name" 
                    placeholder="Enter first name" 
                    onChange={handleChange} 
                    value={form.first_name}
                    variant="blue"
                />
                <Input
                    label="Last Name"
                    type="text"
                    name="last_name"
                    placeholder="Enter last name"
                    onChange={handleChange}
                    value={form.last_name}
                    variant="blue"
                />
                <Input
                    label="Department"
                    type="text"
                    name="department"
                    placeholder="Enter your department"
                    onChange={handleChange}
                    value={form.department}
                    variant="blue"
                />
                <Input
                    label="Position"
                    type="text"
                    name="position" 
                    placeholder="Enter your position (Lecturer, Professor, etc.)"
                    onChange={handleChange}
                    value={form.position}
                    variant="blue"
                />
                <Input
                    label="Employee ID" 
                    type="text" 
                    name="employee_id" 
                    placeholder="Enter your employee ID" 
                    onChange={handleChange}
                    value={form.employee_id}
                    variant="blue"
                />
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    value={form.email}
                    variant="blue"
                />
                <Input 
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Choose your password"
                    onChange={handleChange}
                    value={form.password}
                    variant="blue"
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirm_password"
                    placeholder="Enter password again" 
                    onChange={handleChange} 
                    value={form.confirm_password}
                    variant="blue"
                />

                <Button value={isLoading ? "Registering..." : "Register"} disabled={isLoading} variant="blue"/>       
                <p className="text-gray-400 text-center mt-2 font-sans text-sm">
                    Already have an account? <a href="/staff/login" className="text-blue-800">Login</a>
                </p>
            </div>
        </Form>
    )
} 