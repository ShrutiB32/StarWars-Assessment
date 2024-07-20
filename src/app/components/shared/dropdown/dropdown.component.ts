import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
 
  @Input() dropDownData : any;
  @Input() dropDownContentClicked : any;
  isDropClicked = false;

  toggleDropDownIcon() {
    this.isDropClicked = !this.isDropClicked
  }

  onSelectItem(selectedItem: any) {
    
    selectedItem.checked = !selectedItem.checked;
    this.dropDownData.map((data:any)=>{
      if(data.name !== selectedItem.name || data.title !== selectedItem.title){
        data.checked = false;
      }
    })
    console.log(this.dropDownData)
  }
}
