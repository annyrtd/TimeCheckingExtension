// TODO
// 1. Keep previous month in local storage
// 2. Task template

function CreateCurrentDayButton() {
	
	var button = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent',
		id: 'currentDayToggle'
	}).append('Сегодня');
	
	$('main span.mdl-layout-title')
	.css({
		display: 'flex',
		alignItems: 'center',
		minHeight: '65px'
	})
	.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
	.append(button);
	
	componentHandler.upgradeElement(button.get(0));
}

function SetUpInitialState() {
	var rowsIndex = [];
	
	$('tr[id]:not(.future):not(.trTimeChecker):not(.other)').each(
		function() {
			var currentRow = $(this);
			var dayId = currentRow.attr('id');
			
			var index = 0;
			var previous = currentRow;
			var tempMainRow, tempSubtaskRow, startTime;
			
			if (localStorage[dayId]) {
				index = localStorage[dayId];
				for(var i = 0; i < index; i++) {
					tempMainRow = CreateEmptyTimeCheckingRow(i, dayId);
					
					tempMainRow.find('[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]').each(function(){
						var self = $(this);
						var id = self.attr('id')
						if (localStorage[id]) {
							self.val(localStorage[id]);
						}
					});
					
					startTime = localStorage[dayId + '_startTime' + i + '-0'];
					
					if (startTime) {	
						SetUp_StartTime(tempMainRow, startTime);
					}
					
					previous.after(tempMainRow);				
					previous = tempMainRow;
					
					if (localStorage[dayId + '_' + i]) {
						var subtaskCount = +localStorage[dayId + '_' + i];	
						for(var j = 1; j < subtaskCount; j++) {
							tempSubtaskRow = CreateSubtaskRow(i, j, dayId);
							
							tempSubtaskRow.find('[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]').each(function(){
								var self = $(this);
								var id = self.attr('id')
								if (localStorage[id]) {
									self.val(localStorage[id]);
								}
							});
							
							startTime = localStorage[dayId + '_startTime' + i + '-' + j];
					
							if (startTime) {
								SetUp_StartTime(tempSubtaskRow, startTime);
							}
							
							previous.after(tempSubtaskRow);				
							previous = tempSubtaskRow;
						}
						tempMainRow.attr('subtaskcount', subtaskCount);	
						tempMainRow.children('td').first().attr('rowspan', subtaskCount);			
						tempMainRow.children('td').last().attr('rowspan', subtaskCount);
					}
				}			
			}	
			var emptyRow = CreateEmptyTimeCheckingRow(index, dayId);
			localStorage.removeItem(dayId + '_' + index);
			
			previous.after(emptyRow);
			var otherRow = CreateOtherRow(dayId);
			emptyRow.after(otherRow);
			
			rowsIndex[dayId] = index;
			localStorage[dayId] = index;
		}
	);
	
	$('.trTimeChecker, .other').hide();
	
	var currentDayId = GetCurrentDayId();
	
	$('tr.intervalRow, tr[id]').hide();
	$('#' + currentDayId + ', [dayid=' + currentDayId + ']').show();
	
	return rowsIndex;
}

function SetUp_StartTime(row, startTime) {
	var dayId = row.attr('dayid');
	
	if (dayId == GetCurrentDayId()) {
		row.find('[idtype=startTime]').text(startTime);
		row.addClass('inProgress');
		row.find('[idtype=buttonTimeStart]').hide();
		row.find('[idtype=buttonTimeStop]').show();
	} else {
		var time = GetTimeLeftForTheTask(dayId, startTime);
		var inputTime = row.find('[idtype=inputTime]');
		var oldValue = inputTime.val();
		if (oldValue) {
			inputTime.val(SumOfTime(oldValue, time));
		} else {
			inputTime.val(time);
		}							
	}
}

function GetTimeLeftForTheTask(dayId, time){
	
	var mapTimes = function(value) {
		value = value.replace(/ /g, '').replace(/&nbsp;/g, '');
		var regExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
		
		if (regExp.test(value)) {
			return SumOfTime('00:00', value);
		} else {
			return '';
		}
	}
	
	var dayRow = $('#' + dayId);
	var startTimes = dayRow
		.find('td.range.text').first().html()
		.split('<br>')
		.map(mapTimes);
	var finishTimes = dayRow
		.find('td.range.text').last().html()
		.split('<br>')
		.map(mapTimes);
		
	var result = '00:00';
	time = SumOfTime('00:00', time);
	
	for (var i = 0; i < startTimes.length; i++) {
		if (startTimes[i] && finishTimes[i]) {			
			if ((time > startTimes[i]) && (time < finishTimes[i])) {
				result = SumOfTime(result, DifferenceOfTime(finishTimes[i], time))
			} else {
				if (time <= startTimes[i]) {
					result = SumOfTime(result, DifferenceOfTime(finishTimes[i], startTimes[i]))
				}
			}			
		}		
	}

	return result;
}

function SetTableHeightForTime() {
	var tbody = $("table.full-size tbody");
	var height = $(window).height()
		- $('header.mdl-layout__header').outerHeight(true)
		- $('main.mdl-layout__content.content-wide span.mdl-layout-title').outerHeight(true)
		- $('table.full-size thead').outerHeight(true)
		- 50;

	if (tbody.parent().outerWidth(true) + $('div.conclusion').outerWidth(true) > $('div.flexParent').width())
	{
		height = height - $('div.conclusion').outerHeight(true) - 45;
	}
	
	//if (!isMonth)
	//{
	//	height = height - $('div.buttonDiv').outerHeight(true);
	//}
		
	tbody.outerHeight(height);
	
	if (tbody.get(0).scrollHeight <= tbody.get(0).clientHeight)
	{
		tbody.css('height', 'auto');
	}
}

function GetCurrentDayId() {
	var currentDayId = $('tr[id]:not(.future):not(.trTimeChecker):not(.other)')
	.last()
	.attr('id');
	
	return currentDayId;
}

/** функции подсчета времени **/
function SumOfTime(time1, time2)
{
	if (time1.toString().indexOf("-") > -1 && time2.toString().indexOf("-") > -1)
	{
		return "-" + SumOfTime(time1.substr(1), time2.substr(1));
	}
	
	if (time1.toString().indexOf("-") > -1)
	{
		return DifferenceOfTime(time2, time1.substr(1));		
	}	
	
	if (time2.toString().indexOf("-") > -1)
	{
		return DifferenceOfTime(time1, time2.substr(1));		
	}	
	
	// дальше считается для неотрицательных значений
	var position1 = +time1.indexOf(":");
	var position2 = +time2.indexOf(":");
	var hours1 = +time1.substr(0, position1);
	var hours2 = +time2.substr(0, position2);
	var minutes1 = +time1.substr(position1 + 1);	
	var minutes2 = +time2.substr(position2 + 1);
	var sumHours = +(hours1 + hours2) + Math.floor((minutes1 + minutes2)/60);
	var sumMinutes = +(minutes1 + minutes2) % 60;
	return Pad(sumHours,2) + ":" + Pad(sumMinutes,2);
}

function Pad(num, size) 
{
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function DifferenceOfTime(time1, time2)
{
	if (time1.toString().indexOf("-") > -1 && time2.toString().indexOf("-") > -1)
	{
		return DifferenceOfTime(time2.substr(1), time1.substr(1));
	}
	
	if (time1.toString().indexOf("-") > -1)
	{
		return "-" + SumOfTime(time1.substr(1), time2);		
	}	
	
	if (time2.toString().indexOf("-") > -1)
	{
		return SumOfTime(time1, time2.substr(1));		
	}	
	
	// дальше считается для неотрицательных значений
	var position1 = +time1.indexOf(":");
	var position2 = +time2.indexOf(":");
	var hours1 = +time1.substr(0, position1);
	var hours2 = +time2.substr(0, position2);
	var minutes1 = +time1.substr(position1 + 1);	
	var minutes2 = +time2.substr(position2 + 1);
	var differenceHours, differenceMinutes;
	if (hours1 < hours2) /*!!!!! < or <= */
	{
		differenceHours = +(hours2 - hours1) + Math.floor((minutes2 - minutes1)/60);
		differenceMinutes = +(minutes2 - minutes1);
		if (minutes2 < minutes1)	
		{			
			differenceMinutes += 60;
		}
		if (differenceHours.toString().indexOf("-") > -1)
		{
			differenceHours = differenceHours.toString().substr(1);
		}
		else
		{
			if (!(differenceHours == 0 && differenceMinutes == 0))
			{
				differenceHours = "-" + differenceHours;
			}
		} 		
	}
	if (hours1 >= hours2)
	{
		if (hours1 > hours2)
		{
			differenceHours = +(hours1 - hours2) + Math.floor((minutes1 - minutes2)/60);
			differenceMinutes = +(minutes1 - minutes2);
			if (minutes1 < minutes2)
			{				
				differenceMinutes += 60;
			}				
		}
		else
		{
			if (minutes1 >= minutes2)
			{
				differenceHours = "00";
				differenceMinutes = +(minutes1 - minutes2);
			}
			else
			{
				differenceHours = "-0";
				differenceMinutes = +(minutes2 - minutes1);
			}
		}
	}
	var ret = Pad(differenceHours,2) + ":" + Pad(differenceMinutes,2);
	return ret;
}
/*******************************/



function CreateEmptyTimeCheckingRow(taskIndex, dayId) {
	
	var inputTask = $('<input />', {
		type: 'text',
		idtype: 'inputTask',
		id: dayId + '_' + 'inputTask' + taskIndex
	})
	.css({
		width: '220px'
	});
	
	var tdTask = $('<td></td>', {
		colspan: 2
	})
	.append(inputTask);
	
	
	
	var labelStartTime = $('<label></label>', {
		idtype: 'startTime',
		id: dayId + '_' + 'startTime' + taskIndex + '-0'
	});	
	
	var tdStartTime = $('<td></td>', {
		'class': 'subtaskTd',
	})
	.css({
		display: 'none'
	})
	.append(labelStartTime);
	
	
	
	var inputTime = $('<input />', {
		type: 'text',
		idtype: 'inputTime',
		id: dayId + '_' + 'inputTime' + taskIndex + '-0'
	})
	.css({
		width: '70px'
	});
	
	var iconTimeStart = $('<i class="material-icons">play_arrow</i>');
	
	var buttonTimeStart = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStart',
		id: dayId + '_' + 'buttonTimeStart' + taskIndex + '-0'
	})
	.append(iconTimeStart);
	
	var iconTimeStop = $('<i class="material-icons">stop</i>');
	
	var buttonTimeStop = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStop',
		id: dayId + '_' + 'buttonTimeStop' + taskIndex + '-0'
	})
	.css({
		display: 'none'
	})
	.append(iconTimeStop);
	
	
	var tdTime = $('<td></td>', {
		'class': 'subtaskTd'
	})
	.css({
		textAlign: 'center'
	})
	.append(inputTime);
	
	if (dayId == GetCurrentDayId()) {
		tdTime.append(buttonTimeStart, buttonTimeStop);
	}	
	
	
	
	var inputComment = $('<input />', {
		type: 'text',
		idtype: 'inputComment',
		id: dayId + '_' + 'inputComment' + taskIndex + '-0'
	})
	.css({
		width: '180px'
	});
	
	var iconAddSubtask = $('<i class="material-icons" >add</i>');
	
	var buttonAddSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect mdl-button--accent',
		idtype: 'buttonAddSubtask',
		id: dayId + '_' + 'buttonAddSubtask' + taskIndex + '-0'
	})
	.append(iconAddSubtask);
	
	var tdComment = $('<td></td>', {
		colspan: 2,
		'class': 'time subtaskTd'
	})
	.append(inputComment, buttonAddSubtask);
	
	
	
	var iconCloseSubtask = $('<i class="material-icons" >close</i>');
	
	var buttonCloseSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',
		idtype: 'buttonCloseSubtask',
		id: dayId + '_' + 'buttonCloseSubtask' + taskIndex + '-0'
	})
	.append(iconCloseSubtask);
	
	var tdCloseSubtask = $('<td></td>', {
		'class': 'time subtaskTd'
	})
	.append(buttonCloseSubtask);
	
	
	
	var iconDeleteTask = $('<i class="material-icons" >delete</i>');
	
	var buttonDeleteTask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',
		idtype: 'buttonDeleteTask',
		id: dayId + '_' + 'buttonDeleteTask' + taskIndex
	})
	.append(iconDeleteTask);
	
	var tdDeleteTask = $('<td></td>', {
	})
	.append(buttonDeleteTask);
	
	
	
	var subtaskCount = 1;
	
	var tr = $('<tr></tr>', {
		'class': 'trTimeChecker task',
		idtype: 'trTimeChecker',
		dayid: dayId,
		subtaskcount: subtaskCount,
		taskindex: taskIndex,
		id: dayId + '_' + 'trTimeChecker' + taskIndex
	})
	.append(tdTask, tdStartTime, tdTime, tdComment, tdCloseSubtask, tdDeleteTask);	
	
	componentHandler.upgradeElement(buttonTimeStart.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	componentHandler.upgradeElement(buttonDeleteTask.get(0));
	
	return tr;
}

function CreateSubtaskRow(taskIndex, subtaskIndex, dayId) {
	var labelStartTime = $('<label></label>', {
		idtype: 'startTime',
		id: dayId + '_' + 'startTime' + taskIndex + '-' + subtaskIndex
	});	
	
	var tdStartTime = $('<td></td>', {
		'class': 'subtaskTd',
	})
	.css({
		display: 'none'
	})
	.append(labelStartTime);
	
	
	
	var inputTime = $('<input />', {
		type: 'text',
		idtype: 'inputTime',
		id: dayId + '_' + 'inputTime' + taskIndex + '-' + subtaskIndex
	})
	.css({
		width: '70px'
	});
	
	var iconTimeStart = $('<i class="material-icons">play_arrow</i>');
	
	var buttonTimeStart = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStart',
		id: dayId + '_' + 'buttonTimeStart' + taskIndex + '-' + subtaskIndex
	})
	.append(iconTimeStart);
	
	var iconTimeStop = $('<i class="material-icons">stop</i>');
	
	var buttonTimeStop = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStop',
		id: dayId + '_' + 'buttonTimeStop' + taskIndex + '-0'
	})
	.css({
		display: 'none'
	})
	.append(iconTimeStop);
	
	var tdTime = $('<td></td>', {
		'class': 'subtaskTd'
	})
	.css({
		textAlign: 'center'
	})
	.append(inputTime);
	
	if (dayId == GetCurrentDayId()) {
		tdTime.append(buttonTimeStart, buttonTimeStop);
	}	
	
	
	
	var inputComment = $('<input />', {
		type: 'text',
		idtype: 'inputComment',
		id: dayId + '_' + 'inputComment' + taskIndex + '-' + subtaskIndex
	})
	.css({
		width: '180px'
	});
	
	var iconAddSubtask = $('<i class="material-icons" >add</i>');
	
	var buttonAddSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect mdl-button--accent',
		idtype: 'buttonAddSubtask',
		id: dayId + '_' + 'buttonAddSubtask' + taskIndex + '-' + subtaskIndex
	})
	.append(iconAddSubtask);
	
	var tdComment = $('<td></td>', {
		colspan: 2,
		'class': 'time subtaskTd'
	})
	.append(inputComment, buttonAddSubtask);
	
	
	
	var iconCloseSubtask = $('<i class="material-icons" >close</i>');
	
	var buttonCloseSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',
		idtype: 'buttonCloseSubtask',
		id: dayId + '_' + 'buttonCloseSubtask' + taskIndex + '-' + subtaskIndex
	})
	.append(iconCloseSubtask);
	
	var tdCloseSubtask = $('<td></td>', {
		'class': 'time subtaskTd'
	})
	.append(buttonCloseSubtask);
	
	
	
	var tr = $('<tr></tr>', {
		'class': 'trTimeChecker subtask',
		idtype: 'trTimeChecker',
		dayid: dayId,
		taskindex: taskIndex,
		subtaskIndex: subtaskIndex,
		id: dayId + '_' + 'trTimeChecker' + taskIndex + '-' + subtaskIndex
	})
	.append(tdStartTime, tdTime, tdComment, tdCloseSubtask);	
	
	
	
	componentHandler.upgradeElement(buttonTimeStart.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	
	return tr;
}

function CreateOtherRow(dayId) {
	
	var labelTask = $('<label></label>', {
		idtype: 'labelTask',
		id: dayId + '_other_labelTask' 
	})
	.css({
		width: '250px'
	})
	.append('Other');
	
	var tdTask = $('<td></td>', {
		colspan: 2
	})
	.append(labelTask);	
	
	var labelTime = $('<label></label>', {
		idtype: 'labelTime',
		id: dayId + '_other_labelTime' 
	})
	.css({
		width: '70px'
	})
	.append(GetTimeForOtherLabel(dayId));	
	
	var tdTime = $('<td></td>', {
		'class': 'subtaskTd'
	})
	.css({
		textAlign: 'center'
	})
	.append(labelTime)
	
	var tdComment = $('<td></td>', {
		colspan: 4,
		'class': 'time subtaskTd'
	})
	.append('Time for this day left');
	
	var tr = $('<tr></tr>', {
		'class': 'other',
		idtype: 'other',
		dayid: dayId,
		taskindex: 'other',
		id: dayId + '_other'
	})
	.append(tdTask, tdTime, tdComment);	
	
	return tr;
}

function GetTimeForOtherLabel(dayId) {
	var reportTime = $('#' + dayId).find('td.time').last().find('span.usualTime').text();
	
	var inputs = $('[idtype=inputTime][id^=' + dayId + '_]').toArray();
	var times = inputs.map(
		function(input) {
			if ($(input).val())
				return $(input).val();
			else 
				return '';
		}
	);
	
	var regExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
	
	var result = times.reduce(function(sum, current) {
		if (regExp.test(current)) { 
			return SumOfTime(sum, current);
		} else {
			return sum;
		}	 
	}, '00:00');
	
	return DifferenceOfTime(reportTime, result);
}

function CheckRowsNumber(lastRowIndex, dayId) {
	var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + lastRowIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	
	var isAnyInputHasVal = ($('#' + dayId + '_' + 'inputTask' + lastRowIndex).val() != '');
	for (var i = 0; i < subtaskCount; i++) {
		var label = $('#' + dayId + '_' + 'startTime' + lastRowIndex + '-' + i);
		var labelText = label.text();
		isAnyInputHasVal = isAnyInputHasVal 
			|| (labelText != '')
			|| ($('#' + dayId + '_' + 'inputComment' + lastRowIndex + '-' + i).val() != '')
			|| ($('#' + dayId + '_' + 'inputTime' + lastRowIndex + '-' + i).val() != '');
	}
	
	if (isAnyInputHasVal && $('#' + dayId + '_' + 'trTimeChecker' + (lastRowIndex + 1)).length <= 0) 
	{		
		var selector = '#' + dayId + '_' + 'trTimeChecker' + lastRowIndex;
		var lastSubtaskIndex = +$(selector).attr('subtaskcount') - 1;
		if (lastSubtaskIndex != 0) {
			selector += '-' + lastSubtaskIndex;
		}
		$(selector).after(CreateEmptyTimeCheckingRow(++lastRowIndex, dayId));
	} else {
		for (var i = 0; i < lastRowIndex; i++) {
			var currentRow = $('#' + dayId + '_' + 'trTimeChecker' + i);
			if (!currentRow) continue;
			var subtaskCount = currentRow.attr('subtaskcount');
	
			var isAnyInputHasValIndex = ($('#' + dayId + '_' + 'inputTask' + i).val() != '');
			for (var j = 0; j < subtaskCount; j++) {
				var label = $('#' + dayId + '_' + 'startTime' + i + '-' + j)
				var labelText = label.text()
				isAnyInputHasValIndex = isAnyInputHasValIndex 
					|| ($('#' + dayId + '_' + 'startTime' + i + '-' + j).text()  != '')
					|| ($('#' + dayId + '_' + 'inputComment' + i + '-' + j).val()  != '')
					|| ($('#' + dayId + '_' + 'inputTime' + i + '-' + j).val() != '');
			}			
			
			if (!isAnyInputHasValIndex) {
				ClearLocalStorageInputValueForRow(currentRow);	
				localStorage.removeItem(dayId + '_' + i);
				$('[dayid=' + dayId + '][taskindex=' + i + ']').remove();
				
			}				
		}
	}	
	
	return lastRowIndex;
}

function ClearLocalStorageInputValueForRow(row) {
	row.find('[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"], [idtype="startTime"]')
	.each(
		function() {
			var self = $(this);
			if (self.is('input')) {
				self.val('');
			} else {
				self.text('');
			}
			var id = self.attr('id')
			localStorage.removeItem(id);
		}
	);
}

function RecoundIds(dayId) {
	rowsIndex = 0;
			
	$('.task[idtype="trTimeChecker"][dayid=' + dayId + ']').each(
		function() {
			var dayId = $(this).attr('dayid');
			
			$(this).find('[idtype]').each(function() {
				var oldId = $(this).attr('id');
				var idType = $(this).attr('idtype');
				var id = dayId + '_' + idType + rowsIndex;
				if ($(this).parent().hasClass('subtaskTd')) {
					id += '-0';
				}
				$(this).attr('id', id);		
				
				if (($(this).is('input') || $(this).is('label'))&& localStorage[oldId] && oldId != id) {
					localStorage[id] = localStorage[oldId];
					localStorage.removeItem(oldId);
				}
			});
			
			var oldTaskIndex = $(this).attr('taskindex');
			
			$(this).attr('id', dayId + '_' + 'trTimeChecker' + rowsIndex);
			$(this).attr('taskindex', rowsIndex);
			var subtaskCount = $(this).attr('subtaskcount');
			for (var i = 1; i < subtaskCount; i++) {
				RecoundIdsForSubtasksRows(+oldTaskIndex, dayId, +rowsIndex );
			}			
			
			rowsIndex++;
		}
	);
			
	return --rowsIndex;
}

function RecoundIdsForSubtasksRows(taskIndex, dayId, newTaskIndex) {
	subtaskIndex = 0;	
	var realIndex = (newTaskIndex === undefined) ? taskIndex : newTaskIndex;

	$('[dayid=' + dayId + '][idtype=trTimeChecker][taskindex=' + taskIndex + ']').each(
		function() {
			$(this).find('.subtaskTd [idtype]').each(function() {
				var oldId = $(this).attr('id');
				var idType = $(this).attr('idtype');
				var id = dayId + '_' + idType + realIndex + '-' + subtaskIndex;
				$(this).attr('id', id);		

				if ($(this).is('input') && localStorage[oldId] && oldId != id) {
					localStorage[id] = localStorage[oldId];
					localStorage.removeItem(oldId);
				}				
			});
			
			$(this).attr('taskindex', realIndex);
			
			if ($(this).hasClass('subtask')) {
				$(this).attr('id', dayId + '_' + 'trTimeChecker' + realIndex + '-' + subtaskIndex);
				$(this).attr('subtaskindex', subtaskIndex);
			}
			
			subtaskIndex++;
		}
	);	
	
	return subtaskIndex;
}

function ShiftSubtask(taskIndex, dayId) {
	var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	var previousRow = mainRow;
	
	ClearLocalStorageInputValueForRow(mainRow);
	
	for (var i = 1; i < subtaskCount; i++) {
		
		var currentRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex + '-' + i);
		var previousSubtaskTds = previousRow.find('td.subtaskTd');
		currentRow.find('td.subtaskTd').each(function(index) {
			var previousInput = $(previousSubtaskTds[index]).children('input');
			var currentInput = $(this).children('input');
			var previousId = previousInput.attr('id');
			var currentId = currentInput.attr('id');
			
			previousInput.val(currentInput.val());
			
			if (localStorage[currentId] && previousId != currentId) {
				localStorage[previousId] = localStorage[currentId];
				localStorage.removeItem(currentId);
			} else {
				localStorage.removeItem(previousId);
			}
			
			//$(previousSubtaskTds[index]).children('input').val($(this).children('input').val());			
		})
		
		previousRow = currentRow;
	}
	
	currentRow.remove();
}



$(document).ready ( function() {

	CreateCurrentDayButton();
	var rowsIndex = SetUpInitialState();
	SetTableHeightForTime();
	
	
	$(document).on('propertychange input change keyup paste', '[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]',
		function() 
		{
			localStorage[$(this).attr('id')] = $(this).val();
			
			var mainTr = $(this).parent().parent();
			var dayId = mainTr.attr('dayid');
			console.log(rowsIndex);
			console.log(rowsIndex[dayId]);
			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
			rowsIndex[dayId] = RecoundIds(dayId);
			localStorage[dayId] = rowsIndex[dayId];
			
			$('#' + dayId + '_other_labelTime').text(GetTimeForOtherLabel(dayId));
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', '[idtype="buttonDeleteTask"]', 
		function() {	

			var mainTr = $(this).parent().parent();
			var dayId = mainTr.attr('dayid');
			var idType = mainTr.attr('idtype');
			var taskIndex = mainTr.attr('taskindex');
			
			$('.subtask[id^="' + dayId + '_' + idType + taskIndex + '"]').each(function() {
				ClearLocalStorageInputValueForRow($(this));
			}).remove();
			
			ClearLocalStorageInputValueForRow(mainTr);
			localStorage.removeItem(dayId + '_' + taskIndex);
			
			if (rowsIndex[dayId] == 0) {
				SetTableHeightForTime();
				return;
			}
			
			mainTr.remove();
			
			//rowsIndex[dayId] = RecoundIds(dayId);			
			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);
			rowsIndex[dayId] = RecoundIds(dayId);	
			localStorage[dayId] = rowsIndex[dayId];
			
			$('#' + dayId + '_other_labelTime').text(GetTimeForOtherLabel(dayId));
			SetTableHeightForTime();
		}	
	);
	
	$(document).on('click', '[idtype="buttonAddSubtask"]', 
		function() {
			var tr = $(this).parent().parent();		
			var dayId = tr.attr('dayid');
			var taskIndex = +tr.attr('taskindex');
			
			var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex);
			var newSubtaskIndex = +mainRow.attr('subtaskcount');
			tr.after(CreateSubtaskRow(taskIndex, newSubtaskIndex, dayId));
			
			var subtaskCount = newSubtaskIndex + 1;
			
			mainRow.attr('subtaskcount', subtaskCount);			
			mainRow.children('td').first().attr('rowspan', subtaskCount);			
			mainRow.children('td').last().attr('rowspan', subtaskCount);
			localStorage[dayId + '_' + taskIndex] = subtaskCount;
			
			RecoundIdsForSubtasksRows(taskIndex, dayId);
			
			SetTableHeightForTime();
		}	
	);
	
	$(document).on('click', '[idtype="buttonCloseSubtask"]', 
		function() {
			var currentRow = $(this).parent().parent();
			var dayId = currentRow.attr('dayid');
			var taskIndex = currentRow.attr('taskindex');
			
			var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex);
			
			//currentRow.find('[idtype="inputComment"], [idtype="inputTime"]').val("");
			ClearLocalStorageInputValueForRow(currentRow);
			
			var subtaskCount = +mainRow.attr('subtaskcount');
			
			if (subtaskCount == 1) {
				rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
				rowsIndex[dayId] = RecoundIds(dayId);
				localStorage[dayId] = rowsIndex[dayId];
				
				$('#' + dayId + '_other_labelTime').text(GetTimeForOtherLabel(dayId));
				SetTableHeightForTime();
				return;
			}
			
			if (currentRow.attr('id') == dayId + '_' + 'trTimeChecker' + taskIndex) {
				ShiftSubtask(taskIndex, dayId);
			} else {
				currentRow.remove();	
			}			
			
			var newSubtaskCount = subtaskCount - 1;
			
			mainRow.attr('subtaskcount', newSubtaskCount);
			mainRow.children('td').first().attr('rowspan', newSubtaskCount);
			mainRow.children('td').last().attr('rowspan', newSubtaskCount);			
			localStorage[dayId + '_' + taskIndex] = newSubtaskCount;
						
			RecoundIdsForSubtasksRows(+taskIndex, dayId);
			
			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
			rowsIndex[dayId] = RecoundIds(dayId);
			localStorage[dayId] = rowsIndex[dayId];
			
			$('#' + dayId + '_other_labelTime').text(GetTimeForOtherLabel(dayId));
			SetTableHeightForTime();
		}	
	);
	
	$(document).on('click', '[idtype="buttonTimeStart"]', 
		function() {	
			var currentDate = new Date();
			var time = currentDate.getHours() + ":" + currentDate.getMinutes(); // + "." + currentDate.getSeconds();
			// TODO: add counting seconds ???
			
			var mainRow = $(this).parent().parent();
			mainRow.find('[idtype=startTime]').text(time);
			
			var rowId = mainRow.attr('id');
			var dayId = mainRow.attr('dayid');
			var taskIndex = mainRow.attr('taskindex');
			var subtaskIndex = mainRow.attr('subtaskindex') ? mainRow.attr('subtaskindex') : 0;
			
			localStorage[dayId + '_' + 'startTime' + taskIndex + '-' + subtaskIndex] = time;
			
			$(this).hide();
			var stopId = '#' + $(this).attr('id').replace('Start', 'Stop');
			$(stopId).show();	
			mainRow.addClass('inProgress');		

			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
			rowsIndex[dayId] = RecoundIds(dayId);
			localStorage[dayId] = rowsIndex[dayId];
			
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', '[idtype="buttonTimeStop"]', 
		function() {
			var currentDate = new Date();
			var time = currentDate.getHours() + ":" + currentDate.getMinutes(); // + "." + currentDate.getSeconds();
			
			var mainRow = $(this).parent().parent();
			var dayId = mainRow.attr('dayid');
			var rowId = mainRow.attr('id');	
			var taskIndex = mainRow.attr('taskindex');
			var subtaskIndex = mainRow.attr('subtaskindex') ? mainRow.attr('subtaskindex') : 0;			
			
			var input = mainRow.find('[idtype=inputTime]');
			var startTime = mainRow.find('[idtype=startTime]');
			if (input.val()) {
				input.val(SumOfTime(DifferenceOfTime(time, startTime.text()), input.val()));
			} else {
				input.val(DifferenceOfTime(time, startTime.text()));
			}
			
			localStorage[input.attr('id')] = input.val();
			
			$(this).hide();
			var startId = '#' + $(this).attr('id').replace('Stop', 'Start');
			$(startId).show();
			mainRow.removeClass('inProgress');
			
			localStorage.removeItem(dayId + '_' + 'startTime' + taskIndex + '-' + subtaskIndex);
			startTime.text('');
			
			$('#' + dayId + '_other_labelTime').text(GetTimeForOtherLabel(dayId));	

			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
			rowsIndex[dayId] = RecoundIds(dayId);
			localStorage[dayId] = rowsIndex[dayId];
			
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', 'tr[id]:not(.future):not(.trTimeChecker):not(.other)', 
		function (){			
			var dayId = $(this).attr('id');
			
			if ($(this).next().is(':visible')) {
				$('[dayid=' + dayId + ']').hide();
			} else {
				$('[dayid=' + dayId + ']').show();
			}
			
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', '#currentDayToggle', 
		function (){
			$('button.resetButton').click();
			if ($(this).hasClass('mdl-button--accent')) {
				$(this).removeClass('mdl-button--raised mdl-button--accent');
				
				$('tr.intervalRow, tr[id]').not('.future').not('.trTimeChecker').not('.other').show();
				$('.trTimeChecker').hide();
				$('.other').hide();
				
			} else {
				$(this).addClass('mdl-button--raised mdl-button--accent');
				var dayId = GetCurrentDayId();
				
				$('tr.intervalRow, tr[id]').hide();
				$('#' + dayId + ', [dayid=' + dayId + ']').show();			
			}
			
			SetTableHeightForTime();
		}
	);
	
});