import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RecyclingTwoTone, BarChart, CloudUpload, FilterList, FileUpload,Map,DownloadDoneOutlined, RequestQuote, MedicalServices, PersonAddAlt1, LocalHospital, Description } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import Navbar from '../Components/Bar/Navbar';
import Swal from 'sweetalert2'
import axios from 'axios';
;

const HospitalFile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  const uploadedFiles = [
    {
      id: 1,
      fileName: "patient_records_2024.csv",
      fileType: "CSV",
      fileSize: "15.2 MB",
      dateUploaded: "2024-08-08",
      status: "Processing",
      dataType: "Patient Records",
      hospitalId: "HOSP-001"
    },
    {
      id: 2,
      fileName: "staff_credentials_Q2_2024.csv",
      fileType: "CSV",
      fileSize: "3.1 MB",
      dateUploaded: "2024-08-07",
      status: "Uploaded",
      dataType: "Staff Credentials",
      hospitalId: "HOSP-001"
    },
    {
      id: 3,
      fileName: "inventory_update_Aug.csv",
      fileType: "CSV",
      fileSize: "5.8 MB",
      dateUploaded: "2024-08-06",
      status: "Error",
      dataType: "Hospital Inventory",
      hospitalId: "HOSP-002"
    },
    {
      id: 4,
      fileName: "appointment_data_2024.csv",
      fileType: "CSV",
      fileSize: "7.9 MB",
      dateUploaded: "2024-08-05",
      status: "Uploaded",
      dataType: "Patient Records",
      hospitalId: "HOSP-001"
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = uploadedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // New validation schema for hospital admin data
  const validationSchema = Yup.object({
    recordType: Yup.string().required('Record type is required'),
    hospitalId: Yup.string().required('Hospital ID is required'),
    uploadDescription: Yup.string().notRequired(),
    file: Yup.mixed().required('A data file is required').test(
        'fileType',
        'Only CSV files are supported',
        (value) => value && value.type === 'text/csv'
    ),
  });

  const baseURL='http://localhost:8080';
  const formik = useFormik({
    initialValues: {
      recordType: '',
      hospitalId: '',
      uploadDescription: '',
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsUploading(true);
      setUploadStatus(null);
      // Simulating an API call
      setTimeout(() => {
        const isSuccess = Math.random() > 0.1; 
        
        setIsUploading(false);
        if (isSuccess) {
          setUploadStatus('success');
          resetForm(); 
          formik.setFieldValue('file', null); 
        } else {
          setUploadStatus('error');
        }
        document.getElementById('status-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 2000); 
    },
  });

  return (
    <div className='w-full h-screen overflow-y-hidden'>
      <Navbar />
      <div className='bg-gray-200 rounded-xl p-3 mt-5 h-[80%]'>
        <div className='flex p-1 items-center justify-between'>
          <button onClick={() => setIsModalOpen(true)} className='flex p-2 w-[12%] items-center bg-gradient-to-b from-[#317e3d] to-[#4A90A4]/50 color-white text-white justify-around rounded-lg'>
            <CloudUpload />
            <p className='text-md font-bold'>Upload Data</p>
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 h-[90%] rounded-lg shadow-lg w-1/3">
                <header className="mb-4 text-center">
                  <h1 className="text-2xl font-bold text-gray-800 animate-fadeInUp">Hospital Data Upload</h1>
                  <p className="text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    Securely upload necessary hospital data for SmartAccess.
                  </p>
                </header>
                <form onSubmit={formik.handleSubmit}>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="recordType" className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
                      <div className={`form-input-group flex items-center border rounded-lg p-2 transition ${
                          formik.touched.recordType && formik.errors.recordType ? 'border-red-500' : 'border-gray-300 focus-within:ring-2 focus-within:ring-green-700'
                        }`}>
                        <Description style={{ fontSize: '1.5rem' }} className="text-gray-400 mr-2" />
                        <select 
                          id="recordType" 
                          name="recordType" 
                          value={formik.values.recordType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border-none outline-none w-full bg-transparent"
                        >
                          <option value="" disabled>Select record type</option>
                          <option value="patientRecords">Patient Records</option>
                          <option value="staffCredentials">Staff Credentials</option>
                          <option value="hospitalInventory">Hospital Inventory</option>
                        </select>
                      </div>
                      {formik.touched.recordType && formik.errors.recordType ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.recordType}</p>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700 mb-2">Hospital ID</label>
                      <div className={`form-input-group flex items-center border rounded-lg p-2 transition ${
                          formik.touched.hospitalId && formik.errors.hospitalId ? 'border-red-500' : 'border-gray-300 focus-within:ring-2 focus-within:ring-green-700'
                        }`}>
                        <LocalHospital style={{ fontSize: '1.5rem' }} className="text-gray-400 mr-2" />
                        <input
                          id="hospitalId"
                          name="hospitalId"
                          type="text"
                          value={formik.values.hospitalId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="e.g., HOSP-001"
                          className="border-none outline-none w-full bg-transparent"
                        />
                      </div>
                      {formik.touched.hospitalId && formik.errors.hospitalId ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.hospitalId}</p>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="uploadDescription" className="block text-sm font-medium text-gray-700 mb-2">Upload Description</label>
                      <div className={`form-input-group flex items-center border rounded-lg p-2 transition ${
                          formik.touched.uploadDescription && formik.errors.uploadDescription ? 'border-red-500' : 'border-gray-300 focus-within:ring-2 focus-within:ring-green-700'
                        }`}>
                        <Description style={{ fontSize: '1.5rem' }} className="text-gray-400 mr-2" />
                        <textarea
                          id="uploadDescription"
                          name="uploadDescription"
                          value={formik.values.uploadDescription}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Provide a brief description of the data being uploaded..."
                          className="border-none outline-none w-full bg-transparent resize-none"
                          rows="3"
                        />
                      </div>
                      {formik.touched.uploadDescription && formik.errors.uploadDescription ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.uploadDescription}</p>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">Select Data File (CSV)</label>
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition duration-300"
                          style={{
                              borderColor: formik.touched.file && formik.errors.file ? '#ef4444' : '#d1d5db',
                              backgroundColor: formik.values.file ? '#e5e7eb' : '#f9fafb',
                            }}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <CloudUpload style={{ fontSize: '3rem' }} className="text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">CSV files only</p>
                          </div>
                          <input 
                            id="fileUpload" 
                            name="file"
                            type="file" 
                            className="hidden" 
                            accept=".csv" 
                            onChange={(event) => {
                              formik.setFieldValue("file", event.currentTarget.files[0]);
                            }}
                            onBlur={formik.handleBlur}
                          />
                        </label>
                      </div>
                      {formik.values.file ? (
                        <p id="fileName" className="text-xs text-gray-500 mt-2 text-center">
                          File selected: {formik.values.file.name}
                        </p>
                      ) : null}
                      {formik.touched.file && formik.errors.file ? (
                        <p className="text-red-500 text-sm mt-1 text-center">{formik.errors.file}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formik.isSubmitting}
                    >
                      {isUploading ? (
                        <>
                          <div className="loader border-4 border-white/20 border-t-white rounded-full w-5 h-5 mr-2 animate-spin"></div>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <FileUpload className="mr-2" />
                          <span>Upload Data</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
                <div id="status-container" className="mt-8">
                  {isUploading && (
                    <div className="flex items-center justify-center my-4 animate-fadeIn">
                      <div className="loader border-4 border-gray-300 border-t-green-700 rounded-full w-10 h-10 animate-spin"></div>
                      <p className="ml-4 text-gray-600">Uploading data, please wait...</p>
                    </div>
                  )}
                  {uploadStatus === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative animate-fadeIn" role="alert">
                      <strong className="font-bold">Success!</strong>
                      <span className="block sm:inline ml-2">Your data has been uploaded successfully.</span>
                    </div>
                  )}
                  {uploadStatus === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-fadeIn" role="alert">
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline ml-2">Failed to upload data. Please try again.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className='flex p-2 text-white items-center bg-gradient-to-r from-[#97BC62] to-[#333]/10 justify-around w-[9%] rounded-lg'>
            <FilterList />
            <p className='font-bold text-md'>Filter</p>
          </div>
        </div>
        <div className='bg-white rounded-xl mt-2 h-[90%]'>
          <div className='p-2 border rounded-md text-white bg-gray-400 items-center space-x-10 justify-between'>
            <div className='w-full flex items-center justify-between text-sm font-bold text-gray-600 border-b pb-2 mb-2 min-w-[700px]'>
              <span className='w-[15%] text-left'>File Name</span>
              <span className='w-[10%] text-center'>File Type</span>
              <span className='w-[10%] text-center'>File Size</span>
              <span className='w-[15%] text-center'>Date Uploaded</span>
              <span className='w-[15%] text-center'>Data Type</span>
              <span className='w-[10%] text-center'>Hospital ID</span>
              <span className='w-[10%] text-center'>Status</span>
              <span className='w-[15%] text-center'>Actions</span>
            </div>
          </div>
          {currentItems.map(file => (
            <div key={file.id} className='w-full flex items-center justify-between text-sm py-3 border-b hover:bg-gray-50 transition-colors min-w-[700px]'>
              <span className='w-[15%] text-right font-medium text-gray-800 truncate ml-2'>{file.fileName}</span>
              <span className='w-[10%] text-center text-gray-600'>{file.fileType}</span>
              <span className='w-[10%] text-center text-gray-600'>{file.fileSize}</span>
              <span className='w-[15%] text-center text-gray-600'>{file.dateUploaded}</span>
              <span className='w-[15%] text-center text-gray-600 truncate'>{file.dataType}</span>
              <span className='w-[10%] text-center text-gray-600'>{file.hospitalId}</span>
              <span className={`w-[10%] text-center font-semibold`}>{file.status}</span>
              <div className='w-[15%] flex justify-center space-x-2'>
                <button title="Download File" className="text-gray-500 hover:text-blue-500 transition-colors p-1">
                  <DownloadDoneOutlined />
                </button>
                <button title="Delete File" className="text-gray-500 hover:text-red-500 transition-colors p-1">
                  <RecyclingTwoTone />
                </button>
              </div>
            </div>
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
              {Array.from({ length: Math.ceil(uploadedFiles.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`p-2 hover:bg-gray-300 h-11 focus:outline-none ${currentPage === pageNumber ? 'bg-[#317e3d] text-white' : ''}`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(uploadedFiles.length / itemsPerPage)}
                className='p-2 rounded-r-md bg-gray-200 hover:bg-gray-300 focus:outline-none'
              >
                <ChevronRight className='h-5 w-5 text-gray-500' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalFile;
