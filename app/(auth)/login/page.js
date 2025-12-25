'use client'

// node modules
import { Row, Col, Card, Form, Button, Image, Alert, Spinner } from 'react-bootstrap'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

// hooks
import useMounted from 'hooks/useMounted'

const SignIn = () => {
  const hasMounted = useMounted()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    // success
    window.location.href = '/'
  }

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                <h2>Vicky</h2>
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>

            {hasMounted && (
              <Form onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                {/* Email */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter address here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="**************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default SignIn
