import React,{useState} from 'react'
import { ChevronLeft, ChevronRight, Close, CloseRounded } from '@mui/icons-material';
import Navbar from '../Components/Bar/Navbar';
import {  HealthAndSafety } from '@mui/icons-material';
import HospitalCard from '../Components/Cards/HospitalCard';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import { validationSchema } from '../Utils/hospitalValidation';


const Hospitals = () => {
 
     const [modalIsOpen, setIsOpen] = useState(false);
     const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);

     const handlesave = () => {
      Swal.fire('created', 'hospital and admin created','success')
      }
     const closeSecondModal = () => setSecondModalIsOpen(false);
     const handleSubmit = (e) => {
      e.preventDefault();
        setIsOpen(false); 
        setSecondModalIsOpen(true); 
      };
       function openModal() {
            setIsOpen(true);
        }
        function closeModal() {
            setIsOpen(false);
        }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
    const stockData = [
           { ID:"CHUY125300", name:"CHU-Yaounde", location:"Yaounde,Center",Specialties:['Diabetes','Hypertension'] }
    ];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stockData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const baseURL='http://localhost:8080';
    const Formik = useFormik({ 
     initialValues: {
        name: '',
        email: '',
        password: '',
        matriculationID: '',
        hospitalName: '',
        hospitalAddress: '',
        longitude:'',
        latitude:'',
        hospitalRegion: '',
        hospitalTelephone: '',
        telephone: '',
      },
      validationSchema,
      validateOnChange: true, 
      validateOnBlur: true,
     
      onSubmit: async (values) => {
        const body = {
          hospital: {
            name: values.hospitalName,
            address: values.hospitalAddress,
            longitude:values.longitude,
            latitude:values.latitude,
            region: values.hospitalRegion,
            telephone_general: values.hospitalTelephone,
          },
          admin: {
            adminName: values.name,
            adminEmail: values.email,
            adminPassword: values.password,
            adminMatricule: values.matriculationID,
            telephone: values.telephone,
            role: "6877183e36a5e00b2e57f907"
          }
        };
        console.log("form values:", body);
        try {
          const response = await axios.post(`${baseURL}/banks/addHospital`, body);
          console.log(response.data);
          handlesave();
        } catch (error) {
          console.log('Error details:', error.response?.data || error.message);
          Swal.fire('Error', 'Failed to create hospital and admin', 'error');
        }
      }

    });
  return (
    <>   
     <Modal
        appElement={document.getElementById('root') || undefined}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50">
            <div className="flex justify-center shadow-xl items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative shadow-xl w-[27%] my-6 mx-auto">
                <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                      <h3 className="text-2xl font-semibold">Hospital Info</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={closeModal}>
                        <span className="text-black opacity-7 h-10 w-10 items-center flex justify-center text-xl block bg-[#317e3d] py-0 rounded-full">
                          <CloseRounded style={{ color: "white" }} />
                        </span>
                      </button>
                    </div>
                    <div className="relative p-4 flex-auto">
                        <form onSubmit={handleSubmit} className="rounded shadow-md px-8 pb-5 pt-3 w-full">
                            <label htmlFor='hospitalName' className="block py-2 text-black text-sm font-bold mb-1">
                                Hospital Name
                            </label>
                            <input className="shadow appearance-none text-base border rounded w-full py-2 px-1 text-black"
                                type='text'
                                id='hospitalName'
                                name="hospitalName"
                                value={Formik.values.hospitalName}
                                onChange={Formik.handleChange}
                            />
                            {Formik.errors.hospitalName && <span className="text-[#CF3304] text-sm ">{Formik.errors.hospitalName}</span>}

                            <label htmlFor='hospitalRegion' className="block py-2 text-black text-sm font-bold mb-1">
                                Region
                            </label>
                            <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                type='text'
                                id='hospitalRegion'
                                name="hospitalRegion"
                                value={Formik.values.hospitalRegion}
                                onChange={Formik.handleChange}
                            />
                            {Formik.errors.hospitalRegion && <span className="text-[#CF3304] text-sm ">{Formik.errors.hospitalRegion}</span>}

                            <label htmlFor='hospitalAddress' className="block py-2 text-black text-sm font-bold mb-1">
                                Address
                            </label>
                            <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                type='text'
                                id='hospitalAddress'
                                name="hospitalAddress"
                                value={Formik.values.hospitalAddress}
                                onChange={Formik.handleChange}
                            />
                            {Formik.errors.hospitalAddress && <span className="text-[#CF3304] text-sm ">{Formik.errors.hospitalAddress}</span>}
                             
                            <label htmlFor='longitude' className="block py-2 text-black text-sm font-bold mb-1">
                                Longitude
                            </label>
                            <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                type='number'
                                id='longitude'
                                name="longitude"
                                value={Formik.values.longitude}
                                onChange={Formik.handleChange}
                            />
                            {Formik.errors.longitude && <span className="text-[#CF3304] text-sm ">{Formik.errors.longitude}</span>}
                            
                            <label htmlFor='latitude' className="block py-2 text-black text-sm font-bold mb-1">
                               Latitude
                            </label>
                            <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                id='latitude'
                                type='number'
                                name="latitude"
                                value={Formik.values.latitude}
                                onChange={Formik.handleChange}
                            />
                            {Formik.errors.latitude && <span className="text-[#CF3304] text-sm ">{Formik.errors.latitude}</span>}
                            
                            <label htmlFor='hospitalTelephone' className="block py-2 text-black text-sm font-bold mb-1">
                                Telephone
                            </label>
                            <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                type='text'
                                id='hospitalTelephone'
                                name="hospitalTelephone"
                                value={Formik.values.hospitalTelephone}
                                onChange={Formik.handleChange}
                            />
                            {Formik.errors.hospitalTelephone && <span className="text-[#CF3304] text-sm ">{Formik.errors.hospitalTelephone}</span>}

                            <div className="flex justify-end  pt-9 pb-4 border-t border-solid border-blueGray-200 rounded-b">
                              <button className="text-white bg-[#317e3d] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none  mb-1"
                              type="submit">Save and continue</button>
                            </div>
                        </form>
                      </div>
                        </div>
                    </div>
                </div>
          </Modal>
            <Modal
                appElement={document.getElementById('root') || undefined}
                isOpen={secondModalIsOpen}
                onRequestClose={closeSecondModal}
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="flex justify-center shadow-xl items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative shadow-xl w-[27%] my-6 mx-auto">
                        <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-2xl font-semibold">Hospital Admin</h3>
                                <button className="bg-transparent border-0 text-black float-right" onClick={closeSecondModal}>
                                    <span className="text-black opacity-7 h-10 w-10 items-center flex justify-center text-xl block bg-[#317e3d] py-0 rounded-full">
                                        <CloseRounded style={{ color: "white" }} />
                                    </span>
                                </button>
                            </div>

                            <div className="relative p-4 flex-auto">
                                <form onSubmit={Formik.handleSubmit} className="rounded shadow-md px-8 pb-5 pt-3 w-full">
                                    <label htmlFor='name' className="block py-2 text-black text-sm font-bold mb-1">
                                        Full Name
                                    </label>
                                    <input className="shadow appearance-none text-base border rounded w-full py-2 px-1 text-black"
                                        type='text'
                                        id='name'
                                        name="name"
                                        value={Formik.values.name}
                                        onChange={Formik.handleChange}
                                    />
                                    {Formik.errors.name && <span className="text-[#CF3304] text-sm ">{Formik.errors.name}</span>}

                                    <label htmlFor='matriculationID' className="block py-2 text-black text-sm font-bold mb-1">
                                        Matricle
                                    </label>
                                    <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                        type='text'
                                        id='matriculationID'
                                        name="matriculationID"
                                        value={Formik.values.matriculationID}
                                        onChange={Formik.handleChange}
                                    />
                                    {Formik.errors.matriculationID && <span className="text-[#CF3304] text-sm ">{Formik.errors.matriculationID}</span>}

                                    <label htmlFor='email' className="block py-2 text-black text-sm font-bold mb-1">
                                        Email Address
                                    </label>
                                    <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                        type='email'
                                        id='email'
                                        name="email"
                                        value={Formik.values.email}
                                        onChange={Formik.handleChange}
                                    />
                                    {Formik.errors.email && <span className="text-[#CF3304] text-sm ">{Formik.errors.email}</span>}

                                    <label htmlFor='password' className="block py-2 text-black text-sm font-bold mb-1">
                                        Password
                                    </label>
                                    <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                        type='password'
                                        id='password'
                                        name="password"
                                        value={Formik.values.password}
                                        onChange={Formik.handleChange}
                                    />
                                    {Formik.errors.password && <span className="text-[#CF3304] text-sm ">{Formik.errors.password}</span>}

                                    <label htmlFor='telephone' className="block py-2 text-black text-sm font-bold mb-1">
                                        Telephone
                                    </label>
                                    <input className="shadow text-base appearance-none border rounded w-full py-2 px-1 text-black"
                                        type='text'
                                        id='telephone'
                                        name="telephone"
                                        value={Formik.values.telephone}
                                        onChange={Formik.handleChange}
                                    />
                                    {Formik.errors.telephone && <span className="text-[#CF3304] text-sm ">{Formik.errors.telephone}</span>}
                               
                            <div className="flex items-center justify-end mt-2 pt-2 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-white bg-[#317e3d] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1"
                                    type="submit">Submit</button>
                            </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        
    <div className='w-full space-y-3 h-full overflow-y-hidden'>
      <Navbar />
      <div className='bg-gray-100 rounded-xl p-3 h-[90%]'>
        <div className='flex items-center justify-end'>   
            <button onClick= {openModal} className='flex self-end p-2 w-[10%] items-center bg-gradient-to-b from-[#317e3d] to-[#317e3d]/50 color-white text-white justify-around rounded-lg'>
              <HealthAndSafety />
              <p className='text-md font-bold'>Add New</p>
            </button>
        </div>
        <div className='bg-white rounded-xl mt-2 h-[87%]'>
          <div className='p-2 border-b-gray-300 bg-[#317e3d] rounded-lg border flex items-center pr-5 justify-around'>
            <div className=' w-[80%] flex items-center justify-between text-base text-white  font-bold text-right'>
              <span className='text-center'>Matricle</span>
              <span className='text-center'>Name</span>
              <span className='text-right'>Location</span>
              <span className='text-center'>Specialties</span>
            <span className='text-center'>Action</span>
            </div>
          </div>
          {currentItems.map((item, index) => (
            <HospitalCard
              key={index}
              ID={item.ID}
              name={item.name}
              location={item.location}
              specialties={item.Specialties.join(', ')}
            />
          ))}
        
        <div className='flex justify-end mt-5 pr-5'>
          <div className='flex items-center'>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className='p-2 rounded-l-md bg-gray-200 hover:bg-gray-300 focus:outline-none'
            >
              <ChevronLeft className='h-5 w-5 text-gray-500' />
            </button>
            {Array.from({ length: Math.ceil(stockData.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`p-2  hover:bg-gray-300 h-11 focus:outline-none ${currentPage === pageNumber ? 'bg-[#317e3d]' : ''}`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(stockData.length / itemsPerPage)}
              className='p-2 rounded-r-md bg-gray-200 hover:bg-gray-300 focus:outline-none'
            >
              <ChevronRight className='h-5 w-5 text-gray-500' />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Hospitals