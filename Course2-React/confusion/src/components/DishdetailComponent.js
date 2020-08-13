import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderDish({dish}) {

		return(
				<div className="col-12 col-md-5 m-1">
					<Card>
						<CardImg width="100%" src={dish.image} alt={dish.name}/>
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div>
		)
}

function FormatDate({dateString}) {
		/*const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		var date = new Date(dateString)
		return [months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()]*/

		return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dateString)));
	}

function RenderComments({comments}) {

		return(
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{comments.map((comment) => {
							return(
								<li key={comment.id}>
									<p>{comment.comment}</p>
									<p>-- {comment.author}, <FormatDate dateString = {comment.date}/></p>
								</li>
								)
						})}
					</ul>
			</div>
		)
}

const DishDetail = (props) => {
		return(
			<div className="container">

				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr/>
					</div>
				</div>
				{props.dish && (
					<div className="row">
					 <RenderDish dish = {props.dish}/>
					 <RenderComments comments = {props.comments}/>
					</div>
				)}
			</div>
		)
}

export default DishDetail;