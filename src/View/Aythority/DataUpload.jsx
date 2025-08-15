import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RecyclingTwoTone, BarChart, CloudUpload, FilterList, FileUpload,Map,DownloadDoneOutlined, RequestQuote } from '@mui/icons-material';
import Navbar from '../../Components/Bar/Navbar';
import StockCard from '../../Components/Cards/StockCard';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import Swal from 'sweetalert2'
import axios from 'axios';

const DataUpload = () => {

const [isModalOpen, setIsModalOpen] = useState(false);
const [isUploading, setIsUploading] = useState(false);
const [uploadStatus, setUploadStatus] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

 const uploadedFiles = [
        {
            id: 1,
            fileName: "population_douala_2024.csv",
            fileType: "CSV",
            fileSize: "2.5 MB",
            dateUploaded: "2024-08-07",
            status: "Processing",
            dataType: "Population Statistics",
            region: "Douala"
        },
        {
            id: 2,
            fileName: "illness_yaounde_Q2_2024.csv",
            fileType: "CSV",
            fileSize: "1.2 MB",
            dateUploaded: "2024-08-06",
            status: "Uploaded",
            dataType: "Illness Incidence",
            region: "Yaoundé"
        },
        {
            id: 3,
            fileName: "emergency_reports_2023.csv",
            fileType: "CSV",
            fileSize: "5.8 MB",
            dateUploaded: "2024-08-05",
            status: "Error",
            dataType: "Emergency Response",
            region: "Limbe"
        },
        {
            id: 4,
            fileName: "regional_census_garoua.csv",
            fileType: "CSV",
            fileSize: "3.1 MB",
            dateUploaded: "2024-08-04",
            status: "Uploaded",
            dataType: "Population Statistics",
            region: "Garoua"
        },
        {
            id: 5,
            fileName: "healthcare_needs_report.pdf",
            fileType: "PDF",
            fileSize: "500 KB",
            dateUploaded: "2024-08-03",
            status: "Uploaded",
            dataType: "Report",
            region: "All"
        }
    ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = uploadedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const validationSchema = Yup.object({
    packPrice: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be greater than zero')
      .required('Price is required'),
  });

  const baseURL='http://localhost:8080';
  const formik = useFormik({
        initialValues: {
            dataType: '',
            region: '',
            file: null,
        },
        validationSchema: Yup.object({
            dataType: Yup.string().required('Data type is required'),
            region: Yup.string().required('Region is required'),
            file: Yup.mixed().required('A data file is required').test(
                'fileType',
                'Only CSV files are supported',
                (value) => value && value.type === 'text/csv'
            ),
        }),
        onSubmit: async (values, { resetForm }) => {
            setIsUploading(true);
            setUploadStatus(null);

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
          <button   onClick={() => setIsModalOpen(true)} className='flex p-2 w-[12%] items-center bg-gradient-to-b from-[#317e3d] to-[#4A90A4]/50 color-white text-white justify-around rounded-lg'>
              <RequestQuote />
              <p className='text-md font-bold'>Upload a File</p>
          </button>
           {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
           <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 animate-fadeInUp">Data Upload Portal</h1>
              <p className="text-gray-600 mt-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Securely upload new data to update the forecast models.
              </p>
            </header>
              <form onSubmit={formik.handleSubmit}
              // action='/upload_files' enctype='multipart/form-data'
              >
                <div className="space-y-6">
                    <div>
                      <label htmlFor="dataType" className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                      <div className={`form-input-group flex items-center border rounded-lg p-2 transition ${
                          formik.touched.dataType && formik.errors.dataType ? 'border-red-500' : 'border-gray-300 focus-within:ring-2 focus-within:ring-green-700'
                      }`}>
                      <BarChart style={{ fontSize: '1.5rem' }} className="text-gray-400 mr-2" />
                      <select 
                          id="dataType" 
                          name="dataType" 
                          value={formik.values.dataType}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border-none outline-none w-full bg-transparent"
                      >
                          <option value="" disabled>Select data type</option>
                          <option value="population">Population Statistics</option>
                          <option value="illness">Illness Incidence</option>
                      </select>
                      </div>
                      {formik.touched.dataType && formik.errors.dataType ? (
                          <p className="text-red-500 text-sm mt-1">{formik.errors.dataType}</p>
                      ) : null}
                    </div>
                      <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                        <div className={`form-input-group flex items-center border rounded-lg p-2 transition ${
                          formik.touched.region && formik.errors.region ? 'border-red-500' : 'border-gray-300 focus-within:ring-2 focus-within:ring-green-700'
                          }`}>
                          <Map style={{ fontSize: '1.5rem' }} className="text-gray-400 mr-2" />
                            <select 
                              id="region" 
                              name="region" 
                              value={formik.values.region}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="border-none outline-none w-full bg-transparent">
                              <option value="" disabled>Select a region</option>
                              <option value="Center">Center</option>
                              <option value="Litoral">Litoral</option>
                              <option value="East">Esat</option>
                              <option value="Noth-West">North West</option>
                              <option value="South-West">South West</option>
                              <option value="North">North</option>
                              <option value="Far-North">Far North</option>
                              <option value="Adamawa">Adamawa</option>
                              <option value="South">South</option>
                            </select>
                        </div>
                          {formik.touched.region && formik.errors.region ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.region}</p>
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
                      disabled={ formik.isSubmitting}
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
                <span className='w-[10%] text-center'>Region</span>
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
                <span className='w-[10%] text-center text-gray-600'>{file.region}</span>
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
                className={`p-2 hover:bg-gray-300 h-11 focus:outline-none ${currentPage === pageNumber ? 'bg-[#317e3d]' : ''}`}
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

export default DataUpload ;