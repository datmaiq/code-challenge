import React from "react";
import styled from "styled-components";

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  currency: string;
  blockchain: string;
  price: number;
}

// Component to display each wallet balance row
const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
  currency,
  blockchain,
  price,
}) => {
  const imageUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;

  return (
    <RowContainer>
      <CurrencyInfo>
        <CurrencyIcon src={imageUrl} alt={currency} />
        <CurrencyText>
          <Currency>{currency}</Currency>
          <Blockchain>{blockchain}</Blockchain>
        </CurrencyText>
      </CurrencyInfo>
      <AmountInfo>
        <Amount>Amount: {formattedAmount}</Amount>
        <Price>
          1 {currency} = ${price.toFixed(5)}
        </Price>
        <USDValue>Total: ${usdValue.toFixed(5)}</USDValue>
      </AmountInfo>
    </RowContainer>
  );
};

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const CurrencyInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CurrencyIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const CurrencyText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Currency = styled.span`
  font-size: 18px;
  color: #280d5f;
`;

const Blockchain = styled.span`
  font-size: 14px;
  color: #7a6eaa;
`;

const AmountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Amount = styled.span`
  font-size: 18px;
  color: #7745d9;
  font-weight: bold;
`;

const Price = styled.span`
  font-size: 16px;
  color: gray;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const USDValue = styled.span`
  font-size: 18px;
  color: #161e4d;
  font-weight: bold;
`;

export default WalletRow;
