// Actualizado AddRequestModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateRequestModal = ({ show, handleClose, handleUpdateRequest, selectedRequest }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    funcionesCargo: '',
    requerimientosCargo: '',
    sueldo: '',
    ubicacion: '',
    seniority: '',
    duracionTrabajo: '',
    seccion: '',
    yearsExperience: 0,
  });

  useEffect(() => {
    if (selectedRequest) {
      // Llenar el formulario con los datos de la solicitud seleccionada
      setFormData({
        titulo: selectedRequest.titulo,
        descripcion: selectedRequest.descripcion,
        funcionesCargo: selectedRequest.funcionesCargo,
        requerimientosCargo: selectedRequest.requerimientosCargo,
        sueldo: selectedRequest.sueldo,
        ubicacion: selectedRequest.ubicacion,
        seniority: selectedRequest.seniority,
        duracionTrabajo: selectedRequest.duracionTrabajo,
        seccion: selectedRequest.seccion,
        yearsExperience: selectedRequest.yearsExperience,
      });
    }
  }, [selectedRequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    handleUpdateRequest(selectedRequest.id, formData);
    handleClose();
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Agrega los campos del formulario */}
          <Form.Group controlId="titulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese la descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="funcionesCargo">
            <Form.Label>Funciones del Cargo</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese las funciones del cargo"
              name="funcionesCargo"
              value={formData.funcionesCargo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="requerimientosCargo">
            <Form.Label>Requerimientos del Cargo</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese los requerimientos del cargo"
              name="requerimientosCargo"
              value={formData.requerimientosCargo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="sueldo">
            <Form.Label>Sueldo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el sueldo"
              name="sueldo"
              value={formData.sueldo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="ubicacion">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la ubicación"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="seniority">
            <Form.Label>Habilidad destacable</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el seniority"
              name="seniority"
              value={formData.seniority}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="duracionTrabajo">
            <Form.Label>Duración del Trabajo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la duración del trabajo"
              name="duracionTrabajo"
              value={formData.duracionTrabajo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="seccion">
            <Form.Label>Sección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la sección"
              name="seccion"
              value={formData.seccion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="yearsExperience">
            <Form.Label>Años de Experiencia</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese los años de experiencia"
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={() => handleUpdateRequest(formData)}>
            Actualizar Solicitud
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateRequestModal;
