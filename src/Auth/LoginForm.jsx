import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/pages/Ultis/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUserAPI } from '~/redux/User/userSlice'

function LoginForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  let [searchPrams] = useSearchParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registeredEmail = searchPrams.get('registeredEmail')
  const verifiedEmail = searchPrams.get('verifiedEmail')

  const handleQuickFillDemo = () => {
    setValue('email', 'lehoaivu.10092005@gmail.com', { shouldValidate: true })
    setValue('password', '123456789a', { shouldValidate: true })
    toast.info('Demo account pre-filled!')
  }

  const submitLogIn = (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      {
        pending: 'Login is in progress...'
      }
    ).then(res => {
      console.log('res:', res)
      if (!res.error) navigate('/')
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}><TrelloIcon /></Avatar>
          </Box>

          <Box
            sx={{
              margin: '0.75em 1em 0 1em',
              padding: '14px 16px',
              borderRadius: '12px',
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(0, 121, 191, 0.25) 0%, rgba(15, 23, 42, 0.6) 100%)'
                  : 'linear-gradient(135deg, #eef7ff 0%, #e3f2fd 100%)',
              border: '1px solid',
              borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(0, 121, 191, 0.4)' : '#bbdefb'),
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                  : '0 4px 14px rgba(0, 82, 204, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
                <Avatar sx={{ width: 26, height: 26, bgcolor: 'primary.main' }}>
                  <InfoOutlinedIcon sx={{ fontSize: '1.1rem', color: '#fff' }} />
                </Avatar>
                <Typography variant="span" sx={{ fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.2px' }}>
                  Account Demo
                </Typography>
              </Box>

              <Tooltip title="Tự động điền tài khoản demo">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleQuickFillDemo}
                  startIcon={<AutoFixHighIcon fontSize="small" />}
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    py: 0.4,
                    px: 1.2,
                    textTransform: 'none',
                    borderRadius: '8px',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 121, 191, 0.4)'
                    }
                  }}
                >
                  Quick Fill
                </Button>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                onClick={handleQuickFillDemo}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: '6px 10px',
                  borderRadius: '8px',
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff'),
                  border: '1px solid',
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,121,191,0.15)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(0,121,191,0.2)' : 'rgba(0,121,191,0.06)'),
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <EmailIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                  <Typography variant="span" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem' }}>
                    Email:
                  </Typography>
                </Box>
                <Tooltip title="Nhấp để tự động điền Email">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        color: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#0052cc'),
                        fontSize: '0.78rem'
                      }}
                    >
                      lehoaivu.10092005@gmail.com
                    </Typography>
                    <ContentCopyIcon sx={{ fontSize: '0.85rem', color: 'text.disabled' }} />
                  </Box>
                </Tooltip>
              </Box>

              <Box
                onClick={handleQuickFillDemo}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: '6px 10px',
                  borderRadius: '8px',
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff'),
                  border: '1px solid',
                  borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,121,191,0.15)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(0,121,191,0.2)' : 'rgba(0,121,191,0.06)'),
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <KeyIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                  <Typography variant="span" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem' }}>
                    Mật khẩu:
                  </Typography>
                </Box>
                <Tooltip title="Nhấp để tự động điền Mật khẩu">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        color: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#0052cc'),
                        fontSize: '0.78rem'
                      }}
                    >
                      123456789a
                    </Typography>
                    <ContentCopyIcon sx={{ fontSize: '0.85rem', color: 'text.disabled' }} />
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
            {verifiedEmail &&
              <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                Your email&nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
                &nbsp;has been verified.<br />Now you can login to enjoy our services! Have a good day!
              </Alert>
            }

            {registeredEmail &&
              <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                An email has been sent to&nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
                <br />Please check and verify your account before logging in!
              </Alert>}
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                error={!!errors['email']}
                variant="outlined"
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                error={!!errors['password']}
                variant="outlined"
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Do not have an account?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Create account!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
