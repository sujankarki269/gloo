import axios from "axios"
import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import {
  listProductDetails,
  updateProduct,
  deleteProduct,
} from "../actions/productActions"
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants"

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push("/")
    } else if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.goBack()
    } else if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET })
      history.push("/")
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setCategory(product.category)
        setDescription(product.description)
      }
    }
  }, [
    dispatch,
    history,
    productId,
    product,
    successUpdate,
    successDelete,
    userInfo,
  ])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const { data } = await axios.post("/api/upload", formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        description,
      })
    )
  }

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(productId))
    }
  }

  return userInfo && product.user ? (
    userInfo._id === product.user._id ? (
      <>
        <Link to='/' className='btn btn-outline-secondary'>
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  data-testid='edit-name'
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  data-testid='edit-price'
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  data-testid='edit-image'
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  data-testid='edit-category'
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  data-testid='edit-description'
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                data-testid='edit-submit'
                type='submit'
                variant='success'
                className='mt-2 me-2'
              >
                Update
              </Button>
              <Button
                data-testid='edit-delete'
                type='button'
                variant='danger'
                className='mt-2'
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </Form>
          )}
        </FormContainer>
      </>
    ) : (
      <Message variant='danger'>
        Unauthorised Access of Product Edit Page
      </Message>
    )
  ) : (
    ""
  )
}

export default ProductEditScreen
