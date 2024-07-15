import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, TextField, useScrollTrigger} from '@mui/material';
import { CorrectorContext } from '../context/CorrectorContext';
import { AdminContext } from '../context/AdminContext';
import Corrections from './Corrections';

export default function Corrector() {
  const { token } = React.useContext(AdminContext);
  const { list, error, setError, create, edit, destroy, listCorrections} = React.useContext(CorrectorContext);
  const [dataList, setDataList] = React.useState([]);
  const [selectedName, setSelectedName] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [dType, setDType] = React.useState();
  const [correctorName, setCorrectorName] = React.useState("");
  const [corrections, setCorrections] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const response = await create(correctorName);
    if(response.err) {
      setError(response.err.message)
      setLoading(false);
      return;
    }

    const newData = await fetchData();

    const selectedCorrector = newData.find((corrector) => corrector.name === correctorName); //testar
    setSelectedId(selectedCorrector ? selectedCorrector.id : '');

    setError(null);
    handleClose();
  }

  const handleEdit = async (id) => {
    setLoading(true);
    const response = await edit(id, correctorName);
    if(response.err) {
      setError(response.err.message)
      setLoading(false);
      return;
    }
    
    await fetchData();
    setError(null);
    setSelectedName(correctorName);
    handleClose();
  }

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await destroy(id);
    if(response.err) {
      setError(response.err.message)
      setLoading(false);
      return;
    }

    setSelectedId(null);
    setCorrections([]);
    await fetchData();
    setError(null);
    handleClose();
  }

  const handleClickOpen = (type) => {
    switch (type) {
      case 1:
        setDType("add");
        setOpen(true);
        break;
      case 2: 
        setDType("edit");
        setCorrectorName(selectedName);
        setOpen(true);
      break
      case 3: 
        setDType("delete");
        setOpen(true);
        break
      } 
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setCorrectorName("");
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await list();
    setDataList(data);
    setCorrectorName("");
    setLoading(false);
    return data;
  };

  React.useEffect(() => {
    fetchData();
  }, [])

  const handleChangeSelect = async (e) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);
    const selectedCorrector = dataList.find((corrector) => corrector.id === selectedId);
    setSelectedName(selectedCorrector ? selectedCorrector.name : '');
    setLoading(true);
    const corrections = await listCorrections(selectedId);
    setLoading(false);
    setCorrections(corrections);
  }

  return (
    <>
    <Paper elevation={3} sx={{ width: 0.98, margin: 2 }} >
      <Card variant="outlined" sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" fontWeight={700}>
            Corretores
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => {handleClickOpen(1)}}>Novo Corretor</Button>
        </CardActions>
        <CardActions>
             <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
               <Box sx={{ width: 300 }}>
                 <InputLabel id="demo-select-small-label">Corretor(a)</InputLabel>
                 <Select
                  sx={{ width: 1 }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Corrector"
                  onChange={handleChangeSelect}
                  value={selectedId}
                >
                  {dataList.map((corrector) => (
                    <MenuItem value={corrector.id} key={corrector.id}>
                      {corrector.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
            <Button disabled={!selectedId} color="primary" variant="outlined" startIcon={<EditIcon />} onClick={() => {handleClickOpen(2)}}>
              Editar Corretor
            </Button>
            <Button disabled={!selectedId} color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => {handleClickOpen(3)}}>
              Deletar Corretor
            </Button>
          </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        {dType === "add" && (
        <>
          <DialogTitle>Adicionar Corretor</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nome"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setCorrectorName(e.target.value);
                setError(null);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {handleClose(); setError(null); setCorrectorName("");}}>Cancelar</Button>
            {loading ? (<CircularProgress size={24} />) : <Button onClick={handleCreate} disabled={!!error}>Salvar</Button>}
          </DialogActions>
          {error && (
            <Alert variant="filled" severity="error" sx={{margin: 2}}>
              Falha ao adicionar corretor
              <h2>O erro original foi: </h2>
              <p>{error}</p>
            </Alert>
          )}
        </>
      )}
      {dType === "edit" && (
        <>
        <DialogTitle>Editar Corretor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={correctorName}
            onChange={(e) => setCorrectorName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose(); setError(null);}}>Cancelar</Button>
          {loading ? (<CircularProgress size={24} />) : <Button onClick={() => {handleEdit(selectedId); setLoading(true);}}>Salvar</Button>}
        </DialogActions>
        {error && (
          <Alert variant="filled" severity="error" sx={{margin: 2}}>
            Falha ao editar corretor
            <h2>O erro original foi: </h2>
            <p>{error}</p>
          </Alert>
        )}
      </>
      )}
      {dType === "delete" && (
        <>
        <DialogTitle>Deletar Corretor</DialogTitle>
        <DialogContent>
          <Typography>Essa ação é irreversível</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {loading ? (<CircularProgress size={24} />) : <Button variant="contained" color="error" onClick={() => {handleDelete(selectedId)}}>Deletar</Button>}
        </DialogActions>
      </>
      )}
    </Dialog>
    </Paper >
    {loading ? (
      <Paper elevation={3} sx={{ width: 0.98, margin: 2 }}>
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" fontWeight={700}>
              Correções
            </Typography>
            <CircularProgress size={24} />
          </CardContent>
        </Card>
      </Paper>) : <Corrections data={corrections} correctorId={selectedId}/>
    } 
    </>
  );
}