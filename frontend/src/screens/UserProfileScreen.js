import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Meta from "../components/Meta"
import { listUserProducts } from "../actions/productActions"
import { getUserDetailsPublic } from "../actions/userActions"

const UserProfileScreen = ({ match }) => {
  const userId = match.params.id

  const dispatch = useDispatch()

  const userDetailsPublic = useSelector((state) => state.userDetailsPublic)
  const {
    loading: loadingUserDetails,
    error: errorUserDetails,
    user,
  } = userDetailsPublic

  const productListUser = useSelector((state) => state.productListUser)
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productListUser

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listUserProducts(userId))
    dispatch(getUserDetailsPublic(userId))
  }, [dispatch, userId])

  return (
    <>
      <Meta title={userId} />
      {(loadingUserDetails || loadingProducts) && <Loader />}
      {loadingUserDetails ? (
        "" // <Loader />
      ) : errorUserDetails ? (
        <Message variant='danger'>{errorUserDetails}</Message>
      ) : (
        <Row>
          <h1 className='text-4xl font-semibold'>{user.name}</h1>
        </Row>
      )}
      {loadingProducts ? (
        "" //<Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
        <Row>
          {products.length === 0 ? (
            <p>
              {userInfo
                ? userInfo._id === user._id
                  ? "You do not have any listings"
                  : "This user does not currently have any listings"
                : "This user does not currently have any listings"}
            </p>
          ) : (
            products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className='d-flex align-items-stretch'
              >
                <Product product={product} />
              </Col>
            ))
          )}
          {/* {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))} */}
        </Row>
      )}
    </>
  )
}

export default UserProfileScreen
