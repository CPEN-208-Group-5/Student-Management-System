import RegisterForm from '../../components/RegisterForm';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Registration - Computer Engineering Department',
  description: 'Create your student account to access the academic portal and view your academic information.',
  keywords: 'student registration, academic portal, computer engineering, university dashboard',
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Student Registration - Computer Engineering Department',
    description: 'Create your student account and access academic information',
    type: 'website',
  },
}

export default function StudentRegister(){
    return (
        <RegisterForm />
    )
} 