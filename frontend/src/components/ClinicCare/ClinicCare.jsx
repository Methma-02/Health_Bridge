/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useFormContext } from '../../contexts/FormContext';

const ClinicCare = () => {
  const { formData, setFormData } = useFormContext();
  const clinicalObservationRefs = useRef([]);
  const usScanRefs = useRef([]);
  const isInitialMount = useRef(true); // Track initial load

  // Adjust ref arrays to match current row counts
  clinicalObservationRefs.current = formData.clinicalObservationTable.map(
    (_, i) => clinicalObservationRefs.current[i] || React.createRef()
  );
  usScanRefs.current = formData.usScanTable.map(
    (_, i) => usScanRefs.current[i] || React.createRef()
  );

  useEffect(() => {
    if (isInitialMount.current) {
      // Load saved signatures only on initial mount
      formData.clinicalObservationTable.forEach((row, index) => {
        const ref = clinicalObservationRefs.current[index];
        if (row.signature && ref?.current) {
          ref.current.clear(); // Clear first to prevent overlap
          ref.current.fromDataURL(row.signature);
        }
      });

      formData.usScanTable.forEach((row, index) => {
        const ref = usScanRefs.current[index];
        if (row.signature && ref?.current) {
          ref.current.clear();
          ref.current.fromDataURL(row.signature);
        }
      });

      isInitialMount.current = false; // Mark initial load as done
    }
  }, [formData.clinicalObservationTable, formData.usScanTable]);
  
  const handleInputChange = (section, rowIndex, field, value) => {
    setFormData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection[rowIndex] = { ...updatedSection[rowIndex], [field]: value };
      return { ...prevData, [section]: updatedSection };
    });
  };

  const handleSignatureClear = (section, rowIndex) => {
    let refs;
    if (section === 'clinicalObservationTable') {
      refs = clinicalObservationRefs.current;
    } else if (section === 'usScanTable') {
      refs = usScanRefs.current;
    } else return;

    const ref = refs[rowIndex];
    if (ref?.current) {
      ref.current.clear();
      handleInputChange(section, rowIndex, 'signature', '');
    }
  };

  return (
    <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow space-y-6">
      {/* Clinic No / Barcode */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Clinic No / Barcode
        </h2>
        <input
          className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
          placeholder="Enter Clinic No / Barcode"
          value={formData.clinicNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, clinicNumber: e.target.value }))}
        />
      </div>

      {/* Hospital Clinic Care Table */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Hospital Clinic Care
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Date</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">POA</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Weight</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Urine</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Oedema</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">BP</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Fundal Height</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Lie</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Presentation</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">FM/FHS</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Signature</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Designation</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Next Visit Date</th>
            </tr>
          </thead>
          <tbody>
            {formData.clinicalObservationTable.map((row, index) => (
              <tr key={index} className="border-b border-blue-100 hover:bg-blue-50">
                <td className="p-3">
                  <input
                    type="date"
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.date}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'date', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.poa}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'poa', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.weight}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'weight', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.urine}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'urine', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.oedema}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'oedema', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <input
                      className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      placeholder="Systolic"
                      value={row.bp.systolic}
                      onChange={(e) => handleInputChange('clinicalObservationTable', index, 'bp', { ...row.bp, systolic: e.target.value })}
                    />
                    <input
                      className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      placeholder="Diastolic"
                      value={row.bp.diastolic}
                      onChange={(e) => handleInputChange('clinicalObservationTable', index, 'bp', { ...row.bp, diastolic: e.target.value })}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.fundalHeight}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'fundalHeight', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.lie}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'lie', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.presentation}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'presentation', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <input
                      className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      value={row.fmFhs.fm}
                      placeholder="FM"
                      onChange={(e) => handleInputChange('clinicalObservationTable', index, 'fmFhs', { ...row.fmFhs, fm: e.target.value })}
                    />
                    <input
                      className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      value={row.fmFhs.fhs}
                      placeholder="FHS"
                      onChange={(e) => handleInputChange('clinicalObservationTable', index, 'fmFhs', { ...row.fmFhs, fhs: e.target.value })}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <SignatureCanvas
                    ref={clinicalObservationRefs.current[index]}
                    onEnd={() => handleInputChange(
                      'clinicalObservationTable',
                      index,
                      'signature',
                      clinicalObservationRefs.current[index].current.toDataURL()
                    )}
                    canvasProps={{ className: 'border border-blue-200 rounded-md w-full h-32 bg-blue-50' }}
                  />
                  <button
                    className="px-4 py-2 mt-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                    onClick={() => handleSignatureClear('clinicalObservationTable', index)}
                  >
                    Clear
                  </button>
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.designation}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'designation', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="date"
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.nextVisitDate}
                    onChange={(e) => handleInputChange('clinicalObservationTable', index, 'nextVisitDate', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* US Scan Table */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          US Scan
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Date</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">POA</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">EBW</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">CRL</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Gest. Sac</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">BPD</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">HC</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">AC</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">FL</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Liguor</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Placenta</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Av. POA</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Any other</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Signature</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Designation</th>
            </tr>
          </thead>
          <tbody>
            {formData.usScanTable.map((row, index) => (
              <tr key={index} className="border-b border-blue-100 hover:bg-blue-50">
                <td className="p-3">
                  <input
                    type="date"
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.date}
                    onChange={(e) => handleInputChange('usScanTable', index, 'date', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.poa}
                    onChange={(e) => handleInputChange('usScanTable', index, 'poa', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.ebw}
                    onChange={(e) => handleInputChange('usScanTable', index, 'ebw', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.crl}
                    onChange={(e) => handleInputChange('usScanTable', index, 'crl', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.gestSac}
                    onChange={(e) => handleInputChange('usScanTable', index, 'gestSac', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.bpd}
                    onChange={(e) => handleInputChange('usScanTable', index, 'bpd', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.hc}
                    onChange={(e) => handleInputChange('usScanTable', index, 'hc', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.ac}
                    onChange={(e) => handleInputChange('usScanTable', index, 'ac', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.fl}
                    onChange={(e) => handleInputChange('usScanTable', index, 'fl', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.liguor}
                    onChange={(e) => handleInputChange('usScanTable', index, 'liguor', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.placenta}
                    onChange={(e) => handleInputChange('usScanTable', index, 'placenta', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.averagePoa}
                    onChange={(e) => handleInputChange('usScanTable', index, 'averagePoa', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.otherFindings}
                    onChange={(e) => handleInputChange('usScanTable', index, 'otherFindings', e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <SignatureCanvas
                    ref={usScanRefs.current[index]}
                    onEnd={() => handleInputChange(
                      'usScanTable',
                      index,
                      'signature',
                      usScanRefs.current[index].current.toDataURL()
                    )}
                    canvasProps={{ className: 'border border-blue-200 rounded-md w-full h-32 bg-blue-50' }}
                  />
                  <button
                    className="px-4 py-2 mt-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                    onClick={() => handleSignatureClear('usScanTable', index)}
                  >
                    Clear
                  </button>
                </td>
                <td className="p-3">
                  <input
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    value={row.designation}
                    onChange={(e) => handleInputChange('usScanTable', index, 'designation', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Heart and Lungs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Heart
          </h2>
          <textarea
            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            value={formData.cardiac}
            onChange={(e) => setFormData(prev => ({ ...prev, cardiac: e.target.value }))}
          />
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lungs
          </h2>
          <textarea
            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            value={formData.pulmonary}
            onChange={(e) => setFormData(prev => ({ ...prev, pulmonary: e.target.value }))}
          />
        </div>
      </div>

      {/* Risk Factors Identified */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Risk Factors Identified
        </h2>
        <textarea
          className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
          value={formData.riskFactors}
          onChange={(e) => setFormData(prev => ({ ...prev, riskFactors: e.target.value }))}
        />
      </div>

      {/* Plan of Management */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Plan of Management
        </h2>
        <textarea
          className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
          value={formData.managementPlan}
          onChange={(e) => setFormData(prev => ({ ...prev, managementPlan: e.target.value }))}
        />
      </div>

      {/* Clinic Notes */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Clinic Notes
        </h2>
        <textarea
          className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
          value={formData.clinicNotes}
          onChange={(e) => setFormData(prev => ({ ...prev, clinicNotes: e.target.value }))}
        />
      </div>
    </div>
  );
};

export default ClinicCare;