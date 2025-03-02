/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './ClinicCare.css';
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
    <div className="p-4 space-y-4">
      {/* Clinic No / Barcode */}
      <div className="border p-4 mb-2">
        <h2 className="text-lg font-semibold mb-2">Clinic No / Barcode</h2>
        <input
          className="border p-2 w-full"
          placeholder="Enter Clinic No / Barcode"
          value={formData.clinicNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, clinicNumber: e.target.value }))}
        />
      </div>

      {/* Hospital Clinic Care Table */}
      <div className="border p-4 mb-2">
        <h2 className="text-lg font-semibold mb-2">Hospital Clinic Care</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>Date</th><th>POA</th><th>Weight</th><th>Urine</th>
              <th>Oedema</th><th>BP</th><th>Fundal Height</th>
              <th>Lie</th><th>Presentation</th><th>FM/FHS</th>
              <th>Signature</th><th>Designation</th><th>Next Visit Date</th>
            </tr>
          </thead>
          <tbody>
            {formData.clinicalObservationTable.map((row, index) => (
              <tr key={index}>
                 <td><input type="date" className="border p-2 w-full" value={row.date} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'date', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.poa} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'poa', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.weight} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'weight', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.urine} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'urine', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.oedema} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'oedema', e.target.value)} /></td>
                <td>
                  <div className="flex space-x-2">
                    <input className="border p-2 w-full" placeholder="Systolic" value={row.bp.systolic} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'bp', { ...row.bp, systolic: e.target.value })} />
                    <input className="border p-2 w-full" placeholder="Diastolic" value={row.bp.diastolic} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'bp', { ...row.bp, diastolic: e.target.value })} />
                  </div>
                </td>
                <td><input className="border p-2 w-full" value={row.fundalHeight} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'fundalHeight', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.lie} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'lie', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.presentation} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'presentation', e.target.value)} /></td>
                <td>
                  <div className="flex space-x-2">
                    <input className="border p-2 w-full" value={row.fmFhs.fm} placeholder="FM" onChange={(e) => handleInputChange('clinicalObservationTable', index, 'fmFhs', { ...row.fmFhs, fm: e.target.value })} />
                    <input className="border p-2 w-full" value={row.fmFhs.fhs} placeholder="FHS" onChange={(e) => handleInputChange('clinicalObservationTable', index, 'fmFhs', { ...row.fmFhs, fhs: e.target.value })} />
                  </div>
                </td>
                <td>
                  <SignatureCanvas
                    ref={clinicalObservationRefs.current[index]}
                    onEnd={() => handleInputChange(
                      'clinicalObservationTable',
                      index,
                      'signature',
                      clinicalObservationRefs.current[index].current.toDataURL()
                    )}
                    canvasProps={{ className: 'border rounded-md w-full h-32' }}
                  />
                  <button
                    className="border p-2 mt-2"
                    onClick={() => handleSignatureClear('clinicalObservationTable', index)}
                  >
                    Clear
                  </button>
                </td>
                <td><input className="border p-2 w-full" value={row.designation} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'designation', e.target.value)} /></td>
                <td><input type="date" className="border p-2 w-full" value={row.nextVisitDate} onChange={(e) => handleInputChange('clinicalObservationTable', index, 'nextVisitDate', e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* US Scan Table */}
      <div className="border p-4 mb-2">
        <h2 className="text-lg font-semibold mb-2">US Scan</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>Date</th><th>POA</th><th>EBW</th><th>CRL</th>
              <th>Gest. Sac</th><th>BPD</th><th>HC</th><th>AC</th>
              <th>FL</th><th>Liguor</th><th>Placenta</th><th>Av. POA</th>
              <th>Any other</th><th>Signature</th><th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {formData.usScanTable.map((row, index) => (
              <tr key={index}>
                <td><input type="date" className="border p-2 w-full" value={row.date} onChange={(e) => handleInputChange('usScanTable', index, 'date', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.poa} onChange={(e) => handleInputChange('usScanTable', index, 'poa', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.ebw} onChange={(e) => handleInputChange('usScanTable', index, 'ebw', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.crl} onChange={(e) => handleInputChange('usScanTable', index, 'crl', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.gestSac} onChange={(e) => handleInputChange('usScanTable', index, 'gestSac', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.bpd} onChange={(e) => handleInputChange('usScanTable', index, 'bpd', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.hc} onChange={(e) => handleInputChange('usScanTable', index, 'hc', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.ac} onChange={(e) => handleInputChange('usScanTable', index, 'ac', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.fl} onChange={(e) => handleInputChange('usScanTable', index, 'fl', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.liguor} onChange={(e) => handleInputChange('usScanTable', index, 'liguor', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.placenta} onChange={(e) => handleInputChange('usScanTable', index, 'placenta', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.averagePoa} onChange={(e) => handleInputChange('usScanTable', index, 'averagePoa', e.target.value)} /></td>
                <td><input className="border p-2 w-full" value={row.otherFindings} onChange={(e) => handleInputChange('usScanTable', index, 'otherFindings', e.target.value)} /></td>
                <td>
                  <SignatureCanvas
                    ref={usScanRefs.current[index]}
                    onEnd={() => handleInputChange(
                      'usScanTable',
                      index,
                      'signature',
                      usScanRefs.current[index].current.toDataURL()
                    )}
                    canvasProps={{ className: 'border rounded-md w-full h-32' }}
                  />
                  <button
                    className="border p-2 mt-2"
                    onClick={() => handleSignatureClear('usScanTable', index)}
                  >
                    Clear
                  </button>
                </td>
                <td><input className="border p-2 w-full" value={row.designation} onChange={(e) => handleInputChange('usScanTable', index, 'designation', e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Heart and Lungs */}
        <div className="grid grid-cols-2 gap-4">
        <div className="border p-4">
          <h2 className="text-lg font-semibold mb-2">Heart</h2>
          <textarea
            className="border p-2 w-full"
            value={formData.cardiac}
            onChange={(e) => setFormData(prev => ({ ...prev, cardiac: e.target.value }))} 
          />
        </div>
        <div className="border p-4">
          <h2 className="text-lg font-semibold mb-2">Lungs</h2>
          <textarea
            className="border p-2 w-full"
            value={formData.pulmonary}
            onChange={(e) => setFormData(prev => ({ ...prev, pulmonary: e.target.value }))} 
          />
        </div>
      </div>

      {/* Risk Factors Identified */}
      <div className="border p-4 mb-2">
        <h2 className="text-lg font-semibold mb-2">Risk Factors Identified</h2>
        <textarea
          className="border p-2 w-full"
          value={formData.riskFactors}
          onChange={(e) => setFormData(prev => ({ ...prev, riskFactors: e.target.value }))} 
        />
      </div>

      {/* Plan of Management */}
      <div className="border p-4 mb-2">
        <h2 className="text-lg font-semibold mb-2">Plan of Management</h2>
        <textarea
          className="border p-2 w-full"
          value={formData.managementPlan}
          onChange={(e) => setFormData(prev => ({ ...prev, managementPlan: e.target.value }))} 
        />
      </div>

      {/* Clinic Notes */}
      <div className="border p-4 mb-2">
        <h2 className="text-lg font-semibold mb-2">Clinic Notes</h2>
        <textarea
          className="border p-2 w-full"
          value={formData.clinicNotes}
          onChange={(e) => setFormData(prev => ({ ...prev, clinicNotes: e.target.value }))} 
        />
      </div>
    </div>
  );
};

export default ClinicCare;