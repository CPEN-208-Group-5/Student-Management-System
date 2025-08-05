import StaffRegisterForm from '../../components/StaffRegisterForm';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Staff Registration - Computer Engineering Department',
  description: 'Create your staff account to access the academic portal and manage academic information.',
  keywords: 'staff registration, academic portal, computer engineering, university dashboard',
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Staff Registration - Computer Engineering Department',
    description: 'Create your staff account and manage academic information',
    type: 'website',
  },
}

export default function StaffRegister(){
    return (
        <StaffRegisterForm />
    )
} 