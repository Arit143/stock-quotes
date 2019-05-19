import React, { memo, useContext, useEffect } from 'react';
import head from 'lodash/head';
import PropTypes from 'prop-types';
import { 
    Card, 
    CardBody, 
    CardHeader, 
    Col, 
    Row, 
    Table,     
    DropdownItem,
    DropdownMenu,
    DropdownToggle, 
    UncontrolledButtonDropdown 
} from 'reactstrap';

import { PageContext } from './../../context/PageContext';

import { PERIODS } from './../../constants/app.constants';

/**
 * 
 * @param {*} props 
 * This component loads the stock price on basis on periods
 * and shows the price {date, close} when the periods change
 */

const Stock = (props) => {
	const { periodValue, onDropDownValueChange, stockPriceData } = props;
	const { quoteName } = useContext(PageContext);

	useEffect(() => {
		/**
		 * Fetch the default 1m on page mount
		 */
		onDropDownValueChange(head(PERIODS), quoteName);	
	}, [onDropDownValueChange, quoteName])

    return (
		<Row>
			<Col>
				<Card className="mb-3">
					<CardHeader>{'Stock Details'}</CardHeader>
						<CardBody>
						<Row>
							<Col>
								<UncontrolledButtonDropdown>
									<DropdownToggle
										caret
										color={'primary'}
										className="text-capitalize m-1">
										{periodValue}
									</DropdownToggle>
									<DropdownMenu>
										{PERIODS.map((value, index) => {
											return <DropdownItem
												data-testid="periods" 
												key={index} 
												onClick={() => onDropDownValueChange(value, quoteName)}>
												{value}
											</DropdownItem>
										})}
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</Col>

							<Col>
								<Card body>
									<Table>
										<thead>
										<tr>
											<th>Date</th>
											<th>Close</th>
										</tr>
										</thead>
										<tbody>
											{stockPriceData.map((value, index) => {
												return <tr key={index} data-testid="stockPrices">
													<td data-testid="stockData">{value.date}</td>
													<td data-testid="stockClose">{value.close}</td>
												</tr>
											})}
										</tbody>
									</Table>
								</Card>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
		</Row>
    )
};

Stock.propTypes = {
	periodValue: PropTypes.string,
	onDropDownValueChange: PropTypes.func,
	stockPriceData: PropTypes.array
}

export default memo(Stock);