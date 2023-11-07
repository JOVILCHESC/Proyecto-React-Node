import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/newAuthContext';

const PunctuationCalculator = () => {
  const { authState } = useContext(AuthContext);

  const [applicantId, setApplicantId] = useState('');
  const [totalScore, setTotalScore] = useState(null);

  const calculatePunctuation = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/punctuation/calculate-score/${applicantId}`);
      setTotalScore(response.data.totalScore);
    } catch (error) {
      console.error('Error al calcular la puntuación:', error);
    }
  };

  // Verificar el rol del usuario
  if (authState.role === 'admin') {
    return (
      <div>
        <h2>Calcular Puntuación</h2>
        <label htmlFor="applicantId">ID del Solicitante:</label>
        <input
          type="text"
          id="applicantId"
          value={applicantId}
          onChange={(e) => setApplicantId(e.target.value)}
        />
        <button onClick={calculatePunctuation}>Calcular Puntuación</button>
        {totalScore !== null && (
          <p>
            Puntuación Total: {totalScore}
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-center">Access Denied</h1>
      </div>
    );
  }
};

export default PunctuationCalculator;
