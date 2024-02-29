import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AccountDetail = () => {
  const { id } = useParams();
  const [accountDetails, setAccountDetails] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [balance, setBalance] = useState(0);

  const username = '5ba67756-680c-439f-8161-1494437d1835';
  const password = '8UhMlwazj9Ec*tM8fp@D2_jvjmoHCAeUnwdlhn2smtVxWLMZltMQILVtZ60w_ApX';
  const baseUrl = 'https://sandbox.belvo.com';

  const fetchAccountDetails = async () => {
    try {
      const response = await fetch(`https://sandbox.belvo.com/api/accounts/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (!response.ok) {
        console.error('Error al obtener detalles de la cuenta');
        return;
      }

      const accountData = await response.json();
      setAccountDetails(accountData);

      // Obtener transacciones usando el link de la cuenta
      const link = accountData.link;
      const transactionsResponse = await fetch(`${baseUrl}/api/transactions/?page=1&link=${link}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (!transactionsResponse.ok) {
        console.error('Error al obtener transacciones');
        return;
      }

      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      const inflowAmount = transactionsData.results
        .filter(transaction => transaction.type === 'INFLOW')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const outflowAmount = transactionsData.results
        .filter(transaction => transaction.type === 'OUTFLOW')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      setBalance(inflowAmount - outflowAmount);
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, [id]);

  return (
    <div>
      <h2>Balance: {balance} MXN</h2>
      <h2>Transacciones</h2>
      {transactions ? (
        <div>
          <ul>
            {transactions.results.map((transaction) => (
              <li key={transaction.id}>
                <strong>Tipo:</strong> {transaction.type},{' '}
                <strong>Monto:</strong> {transaction.amount},{' '}
                <strong>Moneda:</strong> {transaction.currency},{' '}
                <strong>Estado:</strong> {transaction.status},{' '}
                <strong>Fecha:</strong> {transaction.value_date},{' '}
                <strong>Referencia:</strong> {transaction.reference}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando transacciones...</p>
      )}
    </div>
  );
};

export default AccountDetail;
