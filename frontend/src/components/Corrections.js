import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable, { TableColumn } from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { CorrectorContext } from "../context/CorrectorContext";

const Corrections = ({ data, correctorId, setLoading }) => {
  const { token } = useContext(AdminContext);
	const { listCorrections } = useContext(CorrectorContext);
  const [dType, setDType] = useState();
  const [selectRow, setSelectRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const [className, setClassName] = useState();
  const [module, setModule] = useState();
  const [meeting, setMeeting] = useState();
  const [student, setStudent] = useState();
  
  const [result, setResult] = useState([]);
	const [newData, setNewData] = useState([]);

	useEffect(() => {
		setNewData(data);
    fetchData();
  }, [data, result]);

  const fetchData = async () => {
   const result = await listCorrections(correctorId);
	 setNewData(result)
  };

  const columns = [
    {
      name: "Turma",
      selector: (row) => row.class,
    },
    {
      name: "Módulo",
      selector: (row) => row.module,
    },
    {
      name: "Aula",
      selector: (row) => row.meeting,
    },
    {
      name: "Aluno",
      selector: (row) => row.student,
    },
    {
      name: "Ações",
      button: true,
      cell: (row) => (
        <div style={{ display: "flex" }}>
          <IconButton
            id={row.id}
            onClick={() => {
              handleClickOpen(2);
              setSelectRow(row);
							setClassName(row.class);
							setModule(row.module);
							setMeeting(row.meeting);
							setStudent(row.student);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            id={row.id}
            onClick={() => {
              handleClickOpen(3);
              setSelectRow(row);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/correthor/corrections",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correctorId: correctorId,
            className: className,
            module: module,
            meeting: meeting,
            student: student,
          }),
        }
      );

      if (response.status !== 201) {
        const { err } = await response.json();
        throw err.message;
      }

      setError("");
      const result = await response.json();
			handleClose();
			fetchData();
      return setResult(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/correthor/corrections/${selectRow.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correctorId: correctorId,
            className: className,
            module: module,
            meeting: meeting,
            student: student,
          }),
        }
      );

      if (response.status !== 200) {
        const { err } = await response.json();
        throw err.message;
      }

      setError("");
      const result = await response.json();
			handleClose();
			fetchData();

    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async () => {
		try {
      const response = await fetch(`http://localhost:3001/correthor/corrections/${selectRow.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        const { err } = await response.json();
        throw err.message;
      }

      setError("");
      const result = await response.json();
			handleClose();
			fetchData();
    } catch (err) {
      setError(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setClassName("");
    setMeeting("");
    setModule("");
    setStudent("");
  };

  const handleClickOpen = (type) => {
    switch (type) {
      case 1:
        setDType("add");
        setOpen(true);
        break;
      case 2:
        setDType("edit");
        setOpen(true);
        break;
      case 3:
        setDType("delete");
        setOpen(true);
        break;
    }
  };

  return (
    <Paper elevation={3} sx={{ width: 0.98, margin: 2 }}>
      <Card variant="outlined" sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" fontWeight={700}>
            Correções
          </Typography>
          <CardActions>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                handleClickOpen(1);
              }}
            >
              Nova Correção
            </Button>
          </CardActions>
          <CardContent>
            <DataTable columns={columns} data={newData} noDataComponent="Esse corretor não possui correções"/>
          </CardContent>
        </CardContent>
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
            <DialogTitle>Adicionar Correção</DialogTitle>
            <DialogContent>
              <TextField autoFocus required margin="dense" id="className" name="className" label="Turma" type="text" fullWidth variant="standard" onChange={(e) => { setClassName(e.target.value); }}/>
              <TextField autoFocus required margin="dense" id="module" name="module" label="Módulo" type="text"fullWidth variant="standard" onChange={(e) => { setModule(e.target.value); }}/>
              <TextField autoFocus required margin="dense" id="meeting" name="meeting" label="Aula" type="text" fullWidth variant="standard" onChange={(e) => { setMeeting(e.target.value); }}/>
              <TextField autoFocus required margin="dense" id="student" name="student" label="Aluno" type="text" fullWidth variant="standard" onChange={(e) => { setStudent(e.target.value); }}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { handleClose(); setError(null); }} > Cancelar </Button>
              <Button onClick={handleCreate}>Salvar</Button>
            </DialogActions>
            {error && (
              <Alert variant="filled" severity="error" sx={{ margin: 2 }}>
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
              <TextField autoFocus required margin="dense" id="className" name="className" label="Turma" type="text" fullWidth variant="standard" value={className} onChange={(e) => { setClassName(e.target.value); }}/>
              <TextField autoFocus required margin="dense" id="module" name="module" label="Módulo" type="text" fullWidth variant="standard" value={module} onChange={(e) => { setModule(e.target.value); }}/>
              <TextField autoFocus required margin="dense" id="meeting" name="meeting" label="Aula" type="text" fullWidth variant="standard" value={meeting} onChange={(e) => { setMeeting(e.target.value); }}/>
              <TextField autoFocus required margin="dense" id="student" name="student" label="Aluno" type="text" fullWidth variant="standard" value={ student } onChange={(e) => { setStudent(e.target.value); }}/>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  setError(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleEdit}>Salvar</Button>
            </DialogActions>
            {error && (
              <Alert variant="filled" severity="error" sx={{ margin: 2 }}>
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
              <Button onClick={() => {handleClose(); setError(null);}}>Cancelar</Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Deletar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
};

export default Corrections;
