import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, subTitle, icons }) => {
    return (<div className='flex flex-row justify-start items-center white-glassmorpism p-3 m-2 cursor-pointer hover:shadow-xl'>
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icons}
        </div>
        <div className='ml-5 flex flex-col flex-1'>
            <h1 className='mt-2 text-lg text-black'>{title}</h1>
            <p className='mt-2 text-sm text-black md:w-9/12'>{subTitle}</p>
        </div>
    </div>
    )
}


const Services = () => {
    return (
        <div className='flex w-full justify-center items-center gradient-bg-services'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
                <div className='flex-1 flex flex-col justify-start items-start'>
                    <h1 className='text-3xl sm:text-3xl py-2 text-gradient'>
                        Services that we<br />
                        continue to improve
                    </h1>
                </div>
            </div>
            <div className='flex-1 flex flex-col flex-start items-center'>
                <ServiceCard
                    color='bg-[#94a5b3] text-white'
                    title="Security Guaranteed"
                    icons={<BsShieldFillCheck fontSize={21} />}
                    subTitle="Security is guaranteed,we always maintain security"
                />
                <ServiceCard
                    color='bg-[#89845F] text-white'
                    title="Best exchange rates"
                    icons={<BiSearchAlt fontSize={21} />}
                    subTitle="Security is guaranteed,we always maintain security"
                />
                <ServiceCard
                    color='bg-[#F84550] text-white'
                    title="Fast Transaction"
                    icons={<BsShieldFillCheck fontSize={21} />}
                    subTitle="Security is guaranteed,we always maintain security"
                />
            </div>
        </div>
    );
}

export default Services;