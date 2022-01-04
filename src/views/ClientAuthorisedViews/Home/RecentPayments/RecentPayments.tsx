import React from 'react';
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import { Card, Col, Container, Row } from "react-bootstrap";
import RecentPaymentsLoadingPlaceholder from "./RecentPaymentsLoadingPlaceholder/RecentPaymentsLoadingPlaceholder";
import { useModalState } from "../../../../hooks/useModalState";
import { transferCategoryClassNames } from "../../../../constants/transferCategoryClassNames";
import { amountColor } from "../../../../constants/amountColor";
import TransferDetailsModal from "../../../../components/Modal/TransferDetailsModal/TransferDetailsModal";
import { useTransfers } from '../../History/hooks/useTransfers';
import { TransferDisplayModel } from '../../../../interfaces/TransferDisplayModel';

dayjs.extend(isLeapYear);
dayjs.locale('pl');

const RecentPayments = () => {
  const { formattedTransfers: transfers, isPending } = useTransfers(undefined, true);
  const { showModal, toggleVisibility, entity } = useModalState<TransferDisplayModel>();

  return (
    <>
      {
        transfers?.map((transfer) => (
          <Card
            className='mt-3 pe-4 ps-4 border-secondary recent-payment'
            onClick={() => toggleVisibility(transfer)}
            key={transfer.transferId}
          >
            <Container className='m-0 p-0 text-start text-nowrap w-100'>
              <Row>
                <Col xs={3}>
                  <span className='fw-bold'>
                    {dayjs(transfer.transferDate).format('DD.MM.YYYY')}
                  </span>
                </Col>

                <Col xs={3}>
                  <span className={`fw-bold ${transferCategoryClassNames[transfer.category]}`}>
                    {transfer.category}
                  </span>
                </Col>

                <Col xs={3}>
                  <span className='fw-bold'>
                    {transfer.receiver_sender}
                  </span>
                </Col>

                <Col xs={3} className='text-end'>
                  <span className={`fw-bold ${amountColor[transfer.type]}`}>
                    {transfer.amount} PLN
                  </span>
                </Col>
              </Row>
            </Container>
          </Card>
        ))
      }

      <TransferDetailsModal
        showModal={showModal}
        toggleVisibility={toggleVisibility}
        data={entity || {} as TransferDisplayModel}
      />

      <RecentPaymentsLoadingPlaceholder isPending={isPending}/>
    </>
  );
};

export default RecentPayments;
