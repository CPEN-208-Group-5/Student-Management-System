'use client'
import Form from './Form';
import Input from './Input';
import Button from './Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function StaffLoginForm(){
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/staff/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                router.push('/lecturer');
                router.refresh();
            } else {
                const { error } = await res.json();
                alert(error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form handleSubmit={handleLogin}>
            <div className="p-4">
                <p className="text-5xl font-bold text-blue-950 text-center mt-2 mb-6">Staff Login</p>
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
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={form.password}
                    variant="blue"
                />
                <Button value={isLoading ? "Logging in..." : "Login"} disabled={isLoading} variant="blue"/>
                <p className="text-gray-400 text-center mt-2 font-sans text-sm">Don&apos;t have an account? <a href="/staff/register" className="text-blue-800">Register</a></p>
            </div>
        </Form>
    )
} 