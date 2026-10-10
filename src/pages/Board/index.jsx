import { useState, useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { Link, useLocation } from 'react-router-dom'
import randomColor from 'randomcolor'
import SidebarCreateBoardModal from './create'

import { styled } from '@mui/material/styles'
import { fetchBoardsAPI } from '~/apis'
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '../Ultis/constants'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function Boards() {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)

  const location = useLocation()
  const query = new URLSearchParams(location.search)

  const page = parseInt(query.get('page') || '1', 10)
  const updateStateData = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }

  useEffect(() => {
    fetchBoardsAPI(location.search)
      .then(updateStateData)
      .catch(() => {
        setBoards([])
      })
  }, [location.search])

  const alfterCreateNewBoard = () => {
    fetchBoardsAPI(location.search).then(updateStateData).catch(() => setBoards([]))
  }

  if (!boards) {
    return (
      <Container disableGutters maxWidth={false}>
        <AppBar />
        <Box sx={{ paddingX: 2, my: 4 }}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={4} md={3}>
              <Stack direction="column" spacing={1}>
                <Skeleton variant="rounded" height={44} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rounded" height={44} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rounded" height={44} sx={{ borderRadius: 2 }} />
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Skeleton variant="rounded" height={40} sx={{ borderRadius: 2 }} />
            </Grid>

            <Grid xs={12} sm={8} md={9}>
              <Skeleton variant="text" width={180} height={40} sx={{ mb: 3 }} />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                  },
                  gap: 2
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rounded"
                    height={145}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ paddingX: 2, my: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={4} md={3}>
            <Stack direction="column" spacing={1}>
              <SidebarItem className="active">
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
              <SidebarItem>
                <ListAltIcon fontSize="small" />
                Templates
              </SidebarItem>
              <SidebarItem>
                <HomeIcon fontSize="small" />
                Home
              </SidebarItem>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="column" spacing={1}>
              <SidebarCreateBoardModal alfterCreateNewBoard={alfterCreateNewBoard} />
            </Stack>
          </Grid>

          <Grid xs={12} sm={8} md={9}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Your boards:</Typography>

            {boards?.length === 0 &&
              <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>No result found!</Typography>
            }

            {boards?.length > 0 &&
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                  },
                  gap: 2
                }}
              >
                {boards.map(b =>
                  <Card
                    key={b._id}
                    sx={{
                      width: '100%',
                      height: '145px',
                      minWidth: 0,
                      maxWidth: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <Box sx={{ height: '45px', minHeight: '45px', backgroundColor: randomColor(), width: '100%' }}></Box>

                    <CardContent
                      sx={{
                        p: 1.5,
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        '&:last-child': { p: 1.5 }
                      }}
                    >
                      <Box sx={{ overflow: 'hidden', width: '100%', minWidth: 0 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            fontSize: '1rem',
                            lineHeight: 1.2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            mb: 0.5
                          }}
                        >
                          {b?.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            fontSize: '0.85rem'
                          }}
                        >
                          {b?.description || 'No description available'}
                        </Typography>
                      </Box>
                      <Box
                        component={Link}
                        to={`/boards/${b._id}`}
                        sx={{
                          mt: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          color: 'primary.main',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.light' }
                        }}
                      >
                          Go to board <ArrowRightIcon fontSize="small" />
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Box>
            }

            {(totalBoards > 0) &&
              <Box sx={{ my: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Pagination
                  size="large"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                  page={page}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
