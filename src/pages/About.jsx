import React from 'react';
import { Mail, PhoneCall, MapPin, CheckCircle2 } from 'lucide-react';
import photo from '../assets/image.Jpeg';
import image from '../assets/photo.png';

function About() {
  return (
    <div className='w-full min-h-screen bg-slate-50 font-sans'>
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='mb-16 text-center md:text-left'>
          <h2 className='text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4'>
            About <span className='text-blue-600'>Equalizer</span>
          </h2>
          <p className='text-lg text-slate-600 max-w-2xl leading-relaxed'>
            Equalizer is a robust loan management system engineered by 
            <span className='text-blue-600 font-extrabold uppercase ml-1'>Turnlake technologies</span>. 
            We provide cutting-edge digital infrastructure to empower lending institutions and their branches.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
          <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='bg-blue-100 p-2 rounded-lg'>
                <CheckCircle2 className='text-blue-600 w-6 h-6' />
              </div>
              <h3 className='text-2xl font-bold text-slate-800'>Why Choose Equalizer?</h3>
            </div>
            
            <ul className='space-y-4'>
              {[
                "Comprehensive clients relationship managements",
                "Advanced data encryption and security measures",
                "Automated staff and role management",
                "Real-time cash flow monitoring (Inflow/Outflow)",
                "Streamlined operational efficiency"
              ].map((feature, index) => (
                <li key={index} className='flex items-center gap-3 text-slate-600'>
                  <div className='w-1.5 h-1.5 bg-blue-500 rounded-full'></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className='bg-blue-600 p-8 rounded-2xl shadow-sm flex flex-col justify-center text-white'>
            <h2 className='text-3xl font-bold uppercase mb-4'>Our Mission</h2>
            <p className='text-blue-100 leading-relaxed text-lg'>
              To revolutionize the lending industry by providing transparent, 
              scalable, and secure technological solutions that bridge the gap 
              between financial institutions and their clients.
            </p>
          </div>
        </div>

        <div className='mb-20'>
          <h2 className='text-3xl font-black text-slate-900 uppercase mb-10 text-center'>Meet Our Team</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center'>
              <div className='relative w-32 h-32 mx-auto mb-6'>
                <img 
                  src={photo} 
                  alt="Ishimwe Precious" 
                  className='w-full h-full rounded-full object-cover grayscale cursor-pointer group-hover:grayscale-0 transition-all duration-500 border-4 border-slate-50 shadow-inner'
                />
              </div>
              <h4 className='text-xs font-black text-blue-600 uppercase tracking-widest mb-1'>Ishimwe Precious</h4>
              <h3 className='text-2xl font-bold text-slate-800 mb-4'>Fullstack Developer</h3>
              <p className='text-slate-500 text-sm leading-relaxed italic'>
                "A passionate developer dedicated to transforming complex ideas into 
                seamless real-world solutions across the entire stack."
              </p>
            </div>

            <div className='group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center'>
              <div className='relative w-32 h-32 mx-auto mb-6'>
                <img 
                  src={image} 
                  alt="Nabahire Octave" 
                  className='w-full h-full rounded-full object-cover  grayscale cursor-pointer group-hover:grayscale-0 transition-all duration-500 border-4 border-slate-50 shadow-inner'
                />
              </div>
              <h4 className='text-xs font-black text-blue-600 uppercase tracking-widest mb-1'>Nabahire Octave</h4>
              <h3 className='text-2xl font-bold text-slate-800 mb-4'>Fullstack Developer</h3>
              <p className='text-slate-500 text-sm leading-relaxed italic'>
                "Focused on building scalable backend architectures and intuitive 
                frontend experiences that drive business growth."
              </p>
            </div>
          </div>
        </div>

        <div className='bg-blue-400 shadow-md rounded-md p-10 text-white'>
          <h2 className='text-3xl font-black uppercase mb-8'>Get In Touch</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex items-center gap-4'>
              <div className='bg-blue-800 p-3 rounded-full'>
                <Mail className='w-5 h-5 text-white' />
              </div>
              <div>
                <p className=' text-xs uppercase font-bold'>Email Us</p>
                <p className='text-sm uppercase'>Equalizer@gmail.com</p>
              </div>
            </div>
            
            <div className='flex items-center gap-4'>
              <div className='bg-blue-800 p-3 rounded-full'>
                <PhoneCall className='w-5 h-5 text-white-400' />
              </div>
              <div>
                <p className=' text-xs uppercase font-bold'>Call Us</p>
                <p className='text-sm'>+260 746 454 3456</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='bg-blue-800 p-3 rounded-full'>
                <MapPin className='w-5 h-5 text-white-400' />
              </div>
              <div>
                <p className='text-xs uppercase font-bold'>Location</p>
                <p className='text-sm'>Kampala, Uganda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;