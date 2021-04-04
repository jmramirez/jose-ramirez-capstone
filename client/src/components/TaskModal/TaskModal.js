import './TaskModal.scss'

const TaskModal = () => {
  return(
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-body">
        <div className="modal-content">
          <button className="modal__close-button"><span className="modal__close-icon"></span></button>
          <h2 className="modal-content__header">Add New Task</h2>
          <form className="modal__add-task">
            <label className="modal__add-task__label">Task Name</label>
            <input type="text" className="modal__add-task__input"/>
            <label className="modal__add-task__label">Task Due</label>
            <input type="text" className="modal__add-task__input"/>
            <label className="modal__add-task__label">Description</label>
            <textarea  className="modal__add-task__input--text"></textarea>
          </form>
        </div>
        <div className="modal-actions">
          <button className="modal__cancel-button">Cancel</button>
          <button className="modal__add-button">
            Add Task
            <span className="material-icons add-event__form__submit__icon">add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
export default TaskModal;