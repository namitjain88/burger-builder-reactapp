import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return (

        class extends Component {
            state = {
                error: null
            }

            errorModalHandler = () => {
                this.setState({ error: null });
            }

            componentWillMount() {
                this.reqInceptor = axios.interceptors.request.use(request => {
                    this.setState({ error: null });
                    return request;
                }, error => {
                    this.setState({ error: error });
                })

                this.resInceptor = axios.interceptors.response.use(response => response, error => {
                    this.setState({ error: error });
                })
            }

            componentWillUnmount() {
                axios.interceptors.request.eject(this.reqInceptor);
                axios.interceptors.response.eject(this.resInceptor);
            }

            render() {
                return (
                    <Auxiliary>
                        <Modal show={this.state.error}
                            cancelled={this.errorModalHandler}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Auxiliary>
                );
            }
        }


    );
}

export default withErrorHandler;
