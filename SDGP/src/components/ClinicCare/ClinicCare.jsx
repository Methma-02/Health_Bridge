import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './ClinicCare.css'; 
const ClinicCare = () => {
  const [formData, setFormData] = useState({
    clinicNumber: '',
    clinicalObservationTable: Array(13).fill().map(() => ({
      date: '',
      poa: '',
      weight: '',
      urine: '',
      oedema: '',
      bp: { systolic: '', diastolic: '' },
      fundalHeight: '',
      lie: '',
      presentation: '',
      fmFhs: { fm: '', fhs: '' },
      signature: '',
      designation: '',
      nextVisitDate: ''
    })),
    usScanTable: Array(15).fill().map(() => ({
      date: '',
      poa: '',
      ebw: '',
      crl: '',
      gestSac: '',
      bpd: '',
      hc: '',
      ac: '',
      fl: '',
      liguor: '',
      placenta: '',
      averagePoa: '',
      otherFindings: '',
      signature: '',
      designation: ''
    })),
    cardiac: '',
    pulmonary: '',
    riskFactors: '',
    managementPlan: '',
    clinicNotes: ''
  });

  // Create separate refs for each row
  const signatureRefs = {
    clinicalObservation: formData.clinicalObservationTable.map(() => useRef(null)),
    usScan: formData.usScanTable.map(() => useRef(null))
  };

  const handleInputChange = (section, rowIndex, field, value) => {
    setFormData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection[rowIndex] = {
        ...updatedSection[rowIndex],
        [field]: value
      };
      return { ...prevData, [section]: updatedSection };
    });
  };

  const handleSignatureClear = (refKey, rowIndex) => {
    if (signatureRefs[refKey][rowIndex].current) {
      signatureRefs[refKey][rowIndex].current.clear();
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
                    ref={signatureRefs.clinicalObservation[index]}
                    onEnd={() => handleInputChange('clinicalObservationTable', index, 'signature', signatureRefs.clinicalObservation[index].current.toDataURL())}
                    canvasProps={{ className: 'border rounded-md w-full h-32' }}
                  />
                  <button className="border p-2 mt-2" onClick={() => handleSignatureClear('clinicalObservation', index)}>Clear</button>
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
                    ref={signatureRefs.usScan[index]}
                    onEnd={() => handleInputChange('usScanTable', index, 'signature', signatureRefs.usScan[index].current.toDataURL())}
                    canvasProps={{ className: 'border rounded-md w-full h-32' }}
                  />
                  <button className="border p-2 mt-2" onClick={() => handleSignatureClear('usScan', index)}>Clear</button>
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
