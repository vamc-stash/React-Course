import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';


const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => val && (val.length >= len)

class CommentForm extends Component {

	state = {
		isModalOpen: false
	}

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		})
	}

	handleSubmit(values) {
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
		/*console.log("Current state is: "+JSON.stringify(values))
    alert("Current state is: "+JSON.stringify(values))*/
  }

	render() {
		return(
				<React.Fragment>
					<Button outline onClick={this.toggleModal}>
	    			<span className="fa fa-pencil fa-lg"></span> Submit Comment
	    		</Button>
	    		<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
	    			<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
	    			<ModalBody>
	    				<LocalForm onSubmit={(values) => {this.handleSubmit(values)}}>
	    					<Row className="form-group">
	    						<Label htmlFor="rating" className="col-12">Rating</Label>
	    						<Col className="col-12">
	    							<Control.select model=".rating" id="rating" name="rating" className="form-control">
	                    <option>1</option> 
	                    <option>2</option>
	                    <option>3</option>
	                    <option>4</option>
	                    <option>5</option>
	                  </Control.select>
	    						</Col>
	    					</Row>
	    					<Row className="form-group">
	    						<Label htmlFor="author" className="col-12">Your Name</Label>
	    						<Col className="col-12">
	    							<Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name"
	    							validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
	    							<Errors
	    								className="text-danger"
	    								model=".author"
	    								show="touched"
	    								messages={{
	    									required: 'Required',
	    									minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
	    								}}
	    							/>
	    						</Col>
	    					</Row>
	    					<Row className="form-group">
	    						<Label htmlFor="comment" className="col-12">Comment</Label>
	    						<Col className="col-12">
	    							<Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6"
	    							/>
	    						</Col>
	    					</Row>
	    					<Row className="form-group">
	                <Col className="col-12">
	                  <Button type="submit" color="primary">Submit</Button>
	                </Col>
	              </Row>
	    				</LocalForm>
	    			</ModalBody>
					</Modal>
    		</React.Fragment>
			)
	}
}

function RenderDish({dish}) {

		return(
				<div className="col-12 col-md-5 m-1">
					<Card>
						<CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
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

function RenderComments({comments, addComment, dishId}) {

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
					<CommentForm dishId={dishId} addComment={addComment}/>
			</div>
		)
}

const DishDetail = (props) => {

		if(props.isLoading) {
			return(
					<div className="container">
						<div className="row">
							<Loading/>
						</div>
					</div>
				)
		}
		else if(props.errMsg) {
			return(
					<div className="container">
						<div className="row">
							<h4>{props.errMsg}</h4>
						</div>
					</div>
				)
		}
			
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
					 <RenderComments comments = {props.comments}
					 addComment={props.addComment} dishId={props.dish.id}/>
					</div>
				)}
			</div>
		)
}

export default DishDetail;