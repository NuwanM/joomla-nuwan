/*! Fabrik */
var DateFilter=new Class({Implements:[Options],options:{calendarSetup:{eventName:"click",ifFormat:"%Y/%m/%d",daFormat:"%Y/%m/%d",singleClick:!0,align:"Br",range:[1900,2999],showsTime:!1,timeFormat:"24",electric:!0,step:2,cache:!1,showOthers:!1}},initialize:function(a){this.setOptions(a),this.cals=$H({});for(var b=0;b<this.options.ids.length;b++)this.makeCalendar(this.options.ids[b],this.options.buttons[b])},makeCalendar:function(a,b){if(this.cals[a])return void this.cals[a].show();if(b=document.id(b),"null"!==typeOf(b)){this.addEventToCalOpts();var c=Object.clone(this.options.calendarSetup);c.inputField=document.id(a);var d=c.inputField||c.displayArea,e=c.inputField?c.ifFormat:c.daFormat;this.cals[a]=null,d&&(c.date=Date.parseDate(d.value||d.innerHTML,e)),this.cals[a]=new Calendar(c.firstDay,c.date,c.onSelect,c.onClose),this.cals[a].setDateStatusHandler(c.dateStatusFunc),this.cals[a].setDateToolTipHandler(c.dateTooltipFunc),this.cals[a].showsTime=c.showsTime,this.cals[a].time24="24"===c.timeFormat.toString(),this.cals[a].weekNumbers=c.weekNumbers,this.cals[a].showsOtherMonths=c.showOthers,this.cals[a].yearStep=c.step,this.cals[a].setRange(c.range[0],c.range[1]),this.cals[a].params=c,this.cals[a].params.button=b,this.cals[a].getDateText=c.dateText,this.cals[a].setDateFormat(e),this.cals[a].create(),this.cals[a].refresh(),this.cals[a].hide(),b.addEvent("click",function(b){b.stop(),this.cals[a].params.position?this.cal.showAt(this.cals[a].params.position[0],paramss[a].position[1]):this.cals[a].showAtElement(this.cals[a].params.button||this.cals[a].params.displayArea||this.cals[a].params.inputField,this.cals[a].params.align),this.cals[a].show()}.bind(this)),this.cals[a].params.inputField.addEvent("blur",function(){var b=this.cals[a].params.inputField.value;if(""!==b){var c=Date.parseDate(b,this.cals[a].params.ifFormat);this.cals[a].date=c}}.bind(this));var f=function(){this.cals[a].hide()};return f.delay(100,this),this.cals[a]}},dateSelect:function(){return!1},calSelect:function(a){this.update(a,a.date.format("db")),a.dateClicked&&a.callCloseHandler()},calClose:function(a){a.hide()},update:function(a,b){b&&("string"===typeOf(b)&&(b=Date.parse(b)),a.params.inputField.value=b.format(this.options.calendarSetup.ifFormat))},addEventToCalOpts:function(){this.options.calendarSetup.onSelect=function(a,b){this.calSelect(a,b)}.bind(this),this.options.calendarSetup.dateStatusFunc=function(a){return this.dateSelect(a)}.bind(this),this.options.calendarSetup.onClose=function(a){this.calClose(a)}.bind(this)},onSubmit:function(){this.cals.each(function(a){""!==a.params.inputField.value&&(a.params.inputField.value=a.date.format("db"))}.bind(this))},onUpdateData:function(){this.cals.each(function(a){""!==a.params.inputField.value&&this.update(a,a.date)}.bind(this))}});