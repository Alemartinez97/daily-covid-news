// import React, { useRef } from "react";
// import moment from "moment";
// import MaterialTable, { MTableEditField } from "material-table";
// import Form from "./form";
// import { connect } from "react-redux";
// import api from "./utils/api";
// import { deleteTask, setTask, editTask } from "./actions/index";
// import tableIcons from "./forms/icons";
// import { makeStyles } from "@material-ui/core/styles";
// import { withRouter } from "react-router-dom";
// import { useSnackbar } from "notistack";
// import Dialog from "@material-ui/core/Dialog";
// const useStyles = makeStyles((theme) => ({
//   dialog: {
//     padding: 0,
//     margin: "0px auto",
//     background: "blue",
//   },
// }));
// const TaskTable = (props) => {
//   const classes = useStyles();
//   const { reset, submitting, event, errors, touched, task } = props;
//   const [open, setOpen] = React.useState(false);
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const [taskData, setTaskData] = React.useState({
//     taskname: "",
//     description: "",
//     state: "",
//     responsable: "",
//   });
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleSubmit = () => {
//     debugger;
//     if(!taskData.taskname)
//     {
//       enqueueSnackbar("Asegurese de llenar todos los campos", {
//         variant: "warning",
//       })
//       return;
//     }
//     if (
//       taskData.taskname &&
//       taskData.description &&
//       taskData.state &&
//       taskData.responsable
//     ) {
//       if (taskData._id) {
//         handleClose();
//         return api
//           .put(`/api/task/${taskData._id}`, taskData)
//           .then((data) => {
//             props.editTask(taskData);
//             enqueueSnackbar(
//               "La tarea " + taskData.taskname + " fue actualizada con exito ",
//               {
//                 variant: "success",
//               }
//             );
//           })
//           .catch((err) => {
//             enqueueSnackbar("Error, La tarea no se actualizo. " + err.msg, {
//               variant: "error",
//             });
//             console.error("Mutation error:", err);
//           });
//       } else {
//         handleClose();
//         return api
//           .post("/api/task", taskData)
//           .then((data) => {
//             props.setTask(taskData);
//             enqueueSnackbar(
//               "La Tarea " + taskData.taskname + " fue guardada con exito ",
//               {
//                 variant: "success",
//               }
//             );
//           })
//           .catch((err) => {
//             enqueueSnackbar("Error, La Tarea no se fue creada. " + err.msg, {
//               variant: "error",
//             });
//             console.error("Mutation error:", err);
//           });
//       }
//     } else {
//     return   enqueueSnackbar("Asegurese de llenar todos los campos", {
//         variant: "warning",
//       });
//     }
//   };
//   const body = (
//     <Form
//       className={classes.dialog}
//       data={taskData}
//       setTaskData={setTaskData}
//       handleClose={handleClose}
//       handleSubmit={handleSubmit}
//     ></Form>
//   );
//   const modalSelect = (
//     <div>
//       <Dialog
//         open={open}
//         // onClose={handleClose}
//         BackdropProps={{
//           timeout: 500,
//         }}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         <div>{body}</div>
//       </Dialog>
//     </div>
//   );

//   /* Drawing Charts */
//   return (
//     <>
//       {modalSelect}
//       <MaterialTable
//         actions={[
//           {
//             icon: () => <span>{<tableIcons.Add />}</span>,
//             onClick: () => {
//               setTaskData({
//                 taskname: "",
//                 description: "",
//                 state: "",
//                 responsable: "",
//               });
//               setOpen(true);
//             },
//             isFreeAction: true,
//             tooltip: "Nueva Tarea",
//           },
//           {
//             icon: () => <span>{<tableIcons.Edit />}</span>,
//             onClick: (event, rowData) => {
//               setTaskData(rowData);
//               setOpen(true);
//             },
//             onRowUpdate: true,
//             tooltip: "Editar Tarea",
//           },
//         ]}
//         options={{
//           search: true,
//           paging: true,
//           toolbarButtonAlignment: "left",
//           actionsColumnIndex: 99,
//           headerStyle: {
//             fontFamily: "italic",
//           },
//         }}
//         // components={{
//         //     EditField: props => <MTableEditField fullWidth {...props} />
//         // }}
//         title="Agregar tarea"
//         columns={[
//           {
//             title: "Tarea",
//             field: "taskname",
//           },
//           {
//             title: "Descripción",
//             field: "description",
//           },
//           {
//             title: "Estado",
//             field: "state",
//           },
//           {
//             title: "Responsable",
//             field: "responsable",
//           },
//           {
//             title: "Fecha",
//             field: "date",
//             render: (rowData) => {
//               return <span> {moment(rowData.date).format("l")} </span>;
//             },
//           },
//         ]}
//         data={task}
//         editable={{
//           onRowDelete: (newData) => {
//             return api
//               ._delete(`/api/task/${newData._id}`)
//               .then((data) => {
//                 props.deleteTask(newData);
//                 enqueueSnackbar(
//                   "La Tarea " + taskData.taskname + " fue eliminada con exito ",
//                   {
//                     variant: "success",
//                   }
//                 );
//               })
//               .catch((err) => {
//                 enqueueSnackbar(
//                   "Error, La Tarea no  fue eliminada. " + err.msg,
//                   {
//                     variant: "error",
//                   }
//                 );
//                 console.error("Mutation error:", err);
//               });
//           },
//         }}
//         icons={tableIcons}
//         // style={{
//         //     marginBottom: 20
//         // }}
//         localization={{
//           header: {
//             actions: "Acciones",
//           },
//           body: {
//             emptyDataSourceMessage: "No hay ninguna tarea cargada",
//           },
//           toolbar: {
//             searchPlaceholder: "Buscar",
//           },
//         }}
//       />
//     </>
//   );
// };
// const mapStateToProps = (state) => {
//   return { task: state.task };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setTask: (task) => dispatch(setTask(task)),
//     editTask: (task) => dispatch(editTask(task)),
//     deleteTask: (task) => dispatch(deleteTask(task)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(TaskTable));
