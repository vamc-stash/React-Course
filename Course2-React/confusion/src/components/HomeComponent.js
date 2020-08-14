import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';

function RenderCard({item, isLoading, errMsg}) {

	if(isLoading) {
		return(
				<Loading/>
			)
	}
	else if(errMsg) {
		return(
				<h4>{errMsg}</h4>
			)
	}

	return(
			<Card>
				<CardImg src={item.image} alt={item.name}/>
				<CardBody>
					<CardTitle>{item.name}</CardTitle>
					{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
					<CardText>{item.description}</CardText>
				</CardBody>
			</Card>
		)
}

export default function Home(props) {
	return(
			<div className="container">
				<div className="row align-items-start" >
					<div className="col-12 col-md m-1">
						<RenderCard item={props.dish} 
						isLoading={props.dishesLoading} 
						errMsg={props.dishesErrMsg}
						/>
					</div>
					<div className="col-12 col-md m-1">
						<RenderCard item={props.promotion}/>
					</div>
					<div className="col-12 col-md m-1">
						<RenderCard item={props.leader}/>
					</div>
				</div>
			</div>
		)
}