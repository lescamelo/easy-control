class ObjectsPanel {

  constructor() {
    this.objects = []

    this.panelContent = document.querySelector('#main-row')

    this.loadObjects()
  }

  loadObjects() {
    fetch('data/objects.json')
      .then(res => res.json())
      .then(objects => {
        this.objects = objects
        this.render()
      })
  }

  render() {
    this.objects.forEach(object => this.genRowContent(object))
  }

  genRowContent(object) {
    const checkboxStatus = object.status
    const col = `<div object-data="${object.name}" class="col">
        <p class="item">
            <label class="switch">
		        <input class="status-checkbox" object-gpio="${object.gpio}" onclick="window.location.assign('/gpio/${object.gpio}/${!object.status}')" type="checkbox">
                <span class="slider round"></span>
            </label>
            <b class="name">${object.name}</b>
            <button type="submit" id="edit-btn" class="edit-button"><i class="fas fa-cog"></i></button>
        </p>
    </div>`

    this.panelContent.insertAdjacentHTML('afterbegin', col)

    const name = document.querySelector(`div[object-data='${object.name}'] .name`)
	const gpio = document.querySelector(`div[object-data='${object.name}'] .status-checkbox`).getAttribute('object-gpio')
	const status_checkbox = document.querySelector(`div[object-data='${object.name}'] .status-checkbox`)
    this.showPinStatus(status_checkbox, gpio)
    const edit_button = document.querySelector(`div[object-data='${object.name}'] .edit-button`)
	this.loadEditNameEvent(edit_button)

  }

  showPinStatus(status_checkbox, gpio) {
	status_checkbox.addEventListener('change', () => {
      const div = status_checkbox.parentNode.parentNode

      const field = div.querySelector(".status-checkbox")
	  this.changePinStatus(field, gpio)
	})
  }

  changePinStatus(field, gpio) {
      window.alert(field.checked + " " + gpio)
  }

  loadEditNameEvent(edit_button) {
    edit_button.addEventListener('click', () => {
      const div = edit_button.parentNode.parentNode

      const fieldClass = "name"
      const field = div.querySelector(".name")
      if (!field.innerHTML.includes('<input')){
        field.innerHTML = fieldClass == "name" ?
          `<input class='new-name' type="text" value="${field.innerHTML}" autofocus>`:
          `<input class='new-name' type="text" value="${field.innerHTML}">`
      }
      this.loadUpdateNameEvent(div)
	})
  }

  loadUpdateNameEvent(div) {
    div.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        const fieldClass = "name"
        const tds = div.querySelector(`.${fieldClass}`)
		console.log(tds)
        const input = tds.querySelector('.new-name')
        const value = input.value
        const name = value

        if (div.dataset.name == name) {
          tds.innerHTML = value
        } else {
		  input.remove()
          const object = {
            name: value
          }
          div.dataset.name = object.name
          tds.innerHTML = value
        }
      }
    })
  }
}

const objects = new ObjectsPanel();

