import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer, Link } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteCert, listUserCerts } from '../actions/certActions'

const UserCertsScreen = ({ history }) => {
  const dispatch = useDispatch()

  const certListUser = useSelector((state) => state.certListUser)
  const { loading, error, certs } = certListUser

  const certDelete = useSelector((state) => state.certDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = certDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listUserCerts(userInfo._id))
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCert(id))
    }
  }

  const nameClickHandler = (certid) => {
    history.push(`/certificates/${certid}`)
  }

  const createCertHandler = () => {
    history.push('/newcertificate')
  }

  return userInfo ? (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Certificates</h1>
        </Col>
        <Col className='text-end'>
          <Button
            className='my-3'
            onClick={createCertHandler}
            data-testid='create-cert-btn'
          >
            <i className='fas fa-plus'></i> Create Certificate
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>CERT ID</th>
                <th>NAME</th>
                <th>ISSUER</th>
                <th>DATE OF ATTAINMENT</th>
                <th>STATUS</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((cert) => (
                <tr key={cert._id}>
                  <td>{cert._id}</td>
                  <td>
                    <a
                      href='/'
                      className='no-underline hover:underline'
                      onClick={(e) => {
                        e.preventDefault()
                        nameClickHandler(cert._id)
                      }}
                    >
                      {cert.name}
                    </a>
                  </td>
                  <td>{cert.issuer}</td>
                  <td>{cert.date}</td>
                  <td>{cert.status}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(cert._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  ) : (
    <Message variant='danger'>
      You need to be logged in to view this page
    </Message>
  )
}

export default UserCertsScreen
