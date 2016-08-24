function CreateTimeTabs() {
	
	var a1 = $('<a href="#all-days" class="mdl-layout__tab is-active">Все дни</a>');
	var a2 = $(' <a href="#current-day" class="mdl-layout__tab">Сегодня</a>');
	
	var tabDiv = $('<div></div>', {
		'class': 'tabs'
	})
	.append(a1, a2);
	
	$('div.flexParent').attr('id', 'all-days').addClass('mdl-layout__tab-panel is-active');
  
	var content2 = $('<div></div>', {
		'class': 'page-content'
	})
	.append('');
	
	var section2 = $('<section></section>', {
		id: 'current-day',
		'class': 'mdl-layout__tab-panel'
	})
	.append(content2);
	
	$('main span.mdl-layout-title')
	.css({
		display: 'flex',
		alignItems: 'center',
		minHeight: '65px'
	})
	.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
	.append(tabDiv);
	$('main').append(section2);
}

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

function SetTableHeightForTime()
{
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


function CreateEmptyTimeCheckingRow(taskIndex, dayId) {
	
	var inputTask = $('<input />', {
		type: 'text',
		idtype: 'inputTask',
		id: dayId + '_' + 'inputTask' + taskIndex
	})
	.css({
		width: '250px'
	});
	
	var tdTask = $('<td></td>', {
		colspan: 2
	})
	.append(inputTask);
	
	
	var tdStartTime = $('<td></td>', {
		'class': 'startTime'
	})
	.css({
		display: 'none'
	});
	
	var tdFinishTime = $('<td></td>', {
		'class': 'finishTime'
	})
	.css({
		display: 'none'
	});	
	
	
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
	.append(inputTime, buttonTimeStart, buttonTimeStop);
	
	
	
	var inputComment = $('<input />', {
		type: 'text',
		idtype: 'inputComment',
		id: dayId + '_' + 'inputComment' + taskIndex + '-0'
	})
	.css({
		width: '200px'
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
	
	var tr = $('<tr></tr>', {
		'class': 'trTimeChecker task',
		idtype: 'trTimeChecker',
		dayid: dayId,
		subtaskcount: 1,
		taskindex: taskIndex,
		id: dayId + '_' + 'trTimeChecker' + taskIndex
	})
	.append(tdTask, tdStartTime, tdFinishTime, tdTime, tdComment, tdCloseSubtask, tdDeleteTask);	
	
	
	
	componentHandler.upgradeElement(buttonTimeStart.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	componentHandler.upgradeElement(buttonDeleteTask.get(0));
	
	return tr;
}

function CreateSubtaskRow(taskIndex, subtaskIndex, dayId) {
	var tdStartTime = $('<td></td>', {
		'class': 'startTime'
	})
	.css({
		display: 'none'
	});
	
	var tdFinishTime = $('<td></td>', {
		'class': 'finishTime'
	})
	.css({
		display: 'none'
	});	
	
	
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
	.append(inputTime, buttonTimeStart, buttonTimeStop);
	
	
	
	var inputComment = $('<input />', {
		type: 'text',
		idtype: 'inputComment',
		id: dayId + '_' + 'inputComment' + taskIndex + '-' + subtaskIndex
	})
	.css({
		width: '200px'
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
	.append(tdStartTime, tdFinishTime, tdTime, tdComment, tdCloseSubtask);	
	
	
	
	componentHandler.upgradeElement(buttonTimeStart.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	
	return tr;
}

function RecoundIds(dayId) {
	rowsIndex = 0;
			
	$('.task[idtype="trTimeChecker"][dayid=' + dayId + ']').each(
		function() {
			var dayId = $(this).attr('dayid');
			
			$(this).find('[idtype]').each(function() {
				var idType = $(this).attr('idtype');
				var id = dayId + '_' + idType + rowsIndex;
				if ($(this).parent().hasClass('subtaskTd')) {
					id += '-0';
				}
				$(this).attr('id', id);					
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

	$('[id^="' + dayId + '_' + 'trTimeChecker' + taskIndex + '"]').each(
		function() {
			$(this).find('.subtaskTd [idtype]').each(function() {
				var idType = $(this).attr('idtype');
				var id = dayId + '_' + idType + realIndex + '-' + subtaskIndex;
				$(this).attr('id', id);					
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

function CheckRowsNumber(lastRowIndex, dayId) {
	var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + lastRowIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	
	var isAnyInputHasVal = ($('#' + dayId + '_' + 'inputTask' + lastRowIndex).val() != '');
	for (var i = 0; i < subtaskCount; i++) {
		isAnyInputHasVal = isAnyInputHasVal 
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
			var subtaskCount = currentRow.attr('subtaskcount');
	
			var isAnyInputHasValIndex = ($('#' + dayId + '_' + 'inputTask' + i).val() != '');
			for (var j = 0; j < subtaskCount; j++) {
				isAnyInputHasValIndex = isAnyInputHasValIndex 
					|| ($('#' + dayId + '_' + 'inputComment' + i + '-' + j).val()  != '')
					|| ($('#' + dayId + '_' + 'inputTime' + i + '-' + j).val() != '');
			}			
			
			if (!isAnyInputHasValIndex) {
				$('[dayid=' + dayId + '][taskindex=' + i + ']').remove();
			}				
		}
	}	
	
	return lastRowIndex;
}

function ShiftSubtask(taskIndex, dayId) {
	var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	var previousRow = mainRow;
	
	for (var i = 1; i < subtaskCount; i++) {
		var currentRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex + '-' + i);
		var previousSubtaskTds = previousRow.find('td.subtaskTd');
		currentRow.find('td.subtaskTd').each(function(index) {
			$(previousSubtaskTds[index]).children('input').val($(this).children('input').val());
		})
		
		previousRow = currentRow;
	}
	
	currentRow.remove();
}

$(document).ready ( function() {

	CreateCurrentDayButton();
	
	var rowsIndex = [];
	
	$('tr[id]:not(.future):not(.trTimeChecker)').each(function() {
		var currentRow = $(this);
		currentRow.addClass('timesheetCollapsed');
		var dayId = currentRow.attr('id');
		var index = 0;
		currentRow.after(CreateEmptyTimeCheckingRow(index, dayId));
		rowsIndex[dayId] = index;		
	});
	
	$('.trTimeChecker').hide();
	
	var currentDayId = $('tr[id]:not(.future):not(.trTimeChecker)').last().removeClass('timesheetCollapsed').attr('id');
	
	$('tr.intervalRow, tr[id]').hide();
	$('#' + currentDayId + ', [dayid=' + currentDayId + ']').show();		
	
	SetTableHeightForTime();
	
	$(document).on('propertychange input change keyup paste', '[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]',
		function() 
		{
			var mainTr = $(this).parent().parent();
			var dayId = mainTr.attr('dayid');
			console.log(rowsIndex);
			console.log(rowsIndex[dayId]);
			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
			rowsIndex[dayId] = RecoundIds(dayId);
			
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', '[idtype="buttonDeleteTask"]', 
		function() {	

			var mainTr = $(this).parent().parent();
			var dayId = mainTr.attr('dayid');
			var idType = mainTr.attr('idtype');
			var taskIndex = mainTr.attr('taskindex');
			
			$('.subtask[id^="' + dayId + '_' + idType + taskIndex + '"]').remove();
			mainTr.find('[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]').val('');
			
			
			if (rowsIndex[dayId] == 0) {
				SetTableHeightForTime();
				return;
			}
			
			mainTr.remove();
			
			rowsIndex[dayId] = RecoundIds(dayId);			
			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);

			SetTableHeightForTime();
		}	
	);
	
	$(document).on('click', '[idtype="buttonAddSubtask"]', 
		function() {
			var tr = $(this).parent().parent();		
			var dayId = tr.attr('dayid');
			var taskIndex = tr.attr('taskindex');
			
			var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex);
			var newSubtaskIndex = mainRow.attr('subtaskcount');
			
			tr.after(CreateSubtaskRow(+taskIndex, +newSubtaskIndex, dayId));
			
			mainRow.attr('subtaskcount', +newSubtaskIndex + 1);
			mainRow.children('td').first().attr('rowspan', +newSubtaskIndex + 1);			
			mainRow.children('td').last().attr('rowspan', +newSubtaskIndex + 1);
			
			RecoundIdsForSubtasksRows(+taskIndex, dayId);
			
			SetTableHeightForTime();
		}	
	);
	
	$(document).on('click', '[idtype="buttonCloseSubtask"]', 
		function() {
			var currentRow = $(this).parent().parent();
			var dayId = currentRow.attr('dayid');
			var taskIndex = currentRow.attr('taskindex');
			
			var mainRow = $('#' + dayId + '_' + 'trTimeChecker' + taskIndex);
			
			currentRow.find('[idtype="inputComment"], [idtype="inputTime"]').val("");
			var subtaskCount = mainRow.attr('subtaskcount');
			
			if (subtaskCount == 1) {
				rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
				rowsIndex[dayId] = RecoundIds(dayId);
				SetTableHeightForTime();
				return;
			}
			
			if (currentRow.attr('id') == dayId + '_' + 'trTimeChecker' + taskIndex) {
				ShiftSubtask(taskIndex, dayId);
			} else {
				currentRow.remove();	
			}
			
			
			mainRow.attr('subtaskcount', +subtaskCount - 1);
			mainRow.children('td').first().attr('rowspan', +subtaskCount - 1);			
			mainRow.children('td').last().attr('rowspan', +subtaskCount - 1);
						
			RecoundIdsForSubtasksRows(+taskIndex, dayId);
			
			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
			rowsIndex[dayId] = RecoundIds(dayId);
			
			SetTableHeightForTime();
		}	
	);
	
	$(document).on('click', '[idtype="buttonTimeStart"]', 
		function() {			
			var currentDate = new Date();
			var time = currentDate.getHours() + ":" + currentDate.getMinutes(); // + "." + currentDate.getSeconds();
			
			var mainRow = $(this).parent().parent();
			mainRow.find('td.startTime').text(time);
			
			$(this).hide();
			var stopId = '#' + $(this).attr('id').replace('Start', 'Stop');
			$(stopId).show();	
			mainRow.addClass('inProgress');			
			
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', '[idtype="buttonTimeStop"]', 
		function() {
			var currentDate = new Date();
			var time = currentDate.getHours() + ":" + currentDate.getMinutes(); // + "." + currentDate.getSeconds();
			
			var mainRow = $(this).parent().parent();
			var dayId = mainRow.attr('dayid');
			
			mainRow.find('td.finishTime').text(time);
			var input = mainRow.find('[idtype=inputTime]');
			if (input.val()) {
				input.val(SumOfTime(DifferenceOfTime(mainRow.find('td.finishTime').text(), mainRow.find('td.startTime').text()), input.val()));
			} else {
				input.val(DifferenceOfTime(mainRow.find('td.finishTime').text(), mainRow.find('td.startTime').text()));
			}
			
			rowsIndex[dayId] = CheckRowsNumber(rowsIndex[dayId], dayId);		
			rowsIndex[dayId] = RecoundIds(dayId);
			
			$(this).hide();
			var startId = '#' + $(this).attr('id').replace('Stop', 'Start');
			$(startId).show();
			mainRow.removeClass('inProgress');
			
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', 'tr[id]:not(.future):not(.trTimeChecker)', 
		function (){
			var dayId = $(this).attr('id');
			if ($(this).hasClass('timesheetCollapsed')) {
				$('[dayid=' + dayId + ']').show();
				$(this).removeClass('timesheetCollapsed');
			} else {
				$('[dayid=' + dayId + ']').hide();
				$(this).addClass('timesheetCollapsed');
			}
			
			SetTableHeightForTime();
		}
	);
	
	$(document).on('click', '#currentDayToggle', 
		function (){
			$('button.resetButton').click();
			if ($(this).hasClass('mdl-button--accent')) {
				$(this).removeClass('mdl-button--raised mdl-button--accent');
				
				$('tr.intervalRow, tr[id]').not('.future').not('.trTimeChecker').show();
				$('.trTimeChecker').hide();
				
			} else {
				$(this).addClass('mdl-button--raised mdl-button--accent');
				var dayId = $('tr[id]:not(.future):not(.trTimeChecker)').last().attr('id');
				
				$('tr.intervalRow, tr[id]').hide();
				$('#' + dayId + ', [dayid=' + dayId + ']').show();			
			}
			
			SetTableHeightForTime();
		}
	);
	
});