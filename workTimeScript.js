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



function CreateEmptyTimeCheckingRow(taskIndex) {
	
	var inputTask = $('<input />', {
		type: 'text',
		idtype: 'inputTask',
		id: 'inputTask' + taskIndex
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
		id: 'inputTime' + taskIndex + '-0'
	})
	.css({
		width: '70px'
	});

	
	var iconTimeStart = $('<i class="material-icons">play_arrow</i>');
	
	var buttonTimeStart = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStart',
		id: 'buttonTimeStart' + taskIndex + '-0'
	})
	.append(iconTimeStart);
	
	var iconTimeStop = $('<i class="material-icons">stop</i>');
	
	var buttonTimeStop = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStop',
		id: 'buttonTimeStop' + taskIndex + '-0'
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
		id: 'inputComment' + taskIndex + '-0'
	})
	.css({
		width: '200px'
	});
	
	var iconAddSubtask = $('<i class="material-icons" >add</i>');
	
	var buttonAddSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect mdl-button--accent',
		idtype: 'buttonAddSubtask',
		id: 'buttonAddSubtask' + taskIndex + '-0'
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
		id: 'buttonCloseSubtask' + taskIndex + '-0'
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
		id: 'buttonDeleteTask' + taskIndex
	})
	.append(iconDeleteTask);
	
	var tdDeleteTask = $('<td></td>', {
	})
	.append(buttonDeleteTask);
	
	var tr = $('<tr></tr>', {
		'class': 'trTimeChecker task',
		idtype: 'trTimeChecker',
		subtaskcount: 1,
		taskindex: taskIndex,
		id: 'trTimeChecker' + taskIndex
	})
	.append(tdTask, tdStartTime, tdFinishTime, tdTime, tdComment, tdCloseSubtask, tdDeleteTask);	
	
	
	
	componentHandler.upgradeElement(buttonTimeStart.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	componentHandler.upgradeElement(buttonDeleteTask.get(0));
	
	return tr;
}

function CreateSubtaskRow(taskIndex, subtaskIndex) {
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
		id: 'inputTime' + taskIndex + '-' + subtaskIndex
	})
	.css({
		width: '70px'
	});

	
	var iconTimeStart = $('<i class="material-icons">play_arrow</i>');
	
	var buttonTimeStart = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStart',
		id: 'buttonTimeStart' + taskIndex + '-' + subtaskIndex
	})
	.append(iconTimeStart);
	
	var iconTimeStop = $('<i class="material-icons">stop</i>');
	
	var buttonTimeStop = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTimeStop',
		id: 'buttonTimeStop' + taskIndex + '-0'
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
		id: 'inputComment' + taskIndex + '-' + subtaskIndex
	})
	.css({
		width: '200px'
	});
	
	var iconAddSubtask = $('<i class="material-icons" >add</i>');
	
	var buttonAddSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect mdl-button--accent',
		idtype: 'buttonAddSubtask',
		id: 'buttonAddSubtask' + taskIndex + '-' + subtaskIndex
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
		id: 'buttonCloseSubtask' + taskIndex + '-' + subtaskIndex
	})
	.append(iconCloseSubtask);
	
	var tdCloseSubtask = $('<td></td>', {
		'class': 'time subtaskTd'
	})
	.append(buttonCloseSubtask);
	
	
	var tr = $('<tr></tr>', {
		'class': 'trTimeChecker subtask',
		idtype: 'trTimeChecker',
		taskindex: taskIndex,
		subtaskIndex: subtaskIndex,
		id: 'trTimeChecker' + taskIndex + '-' + subtaskIndex
	})
	.append(tdStartTime, tdFinishTime, tdTime, tdComment, tdCloseSubtask);	
	
	
	
	componentHandler.upgradeElement(buttonTimeStart.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	
	return tr;
	
	
	/*
	<tr class="trTimeChecker" style="display: table-row;">
		<td rowspan="2" colspan="2" >
			<input type="text" style="width: 250px;" value="Best Buy Survey Development" />
		</td>
		<td style="text-align: center;">
			<input type="text" style="width: 70px;" value="0:27" />
			<i class="material-icons" style="font-size: 17px;">play_arrow</i>
		</td>
		
		
		<td colspan="2" class="time" >
			<input type="text" style="width: 200px;" value="Meeting" />
		</td>
		<td class="time" style="display: none;"></td>
		<td class="time" style="display: none;"></td>
		<td class="time" style="display: none;"></td>
		<td class="time" >
			<i class="material-icons" >close</i>
		</td>
		<td >
			<i class="material-icons">delete</i>
		</td>
	</tr>*/
}

function RecoundIds() {
	rowsIndex = 0;
			
	$('.task[idtype="trTimeChecker"]').each(
		function() {
			$(this).find('[idtype]').each(function() {
				var idType = $(this).attr('idtype');
				var id = idType + rowsIndex;
				if ($(this).parent().hasClass('subtaskTd')) {
					id += '-0';
				}
				$(this).attr('id', id);					
			});
			
			var oldTaskIndex = $(this).attr('taskindex');
			
			$(this).attr('id', 'trTimeChecker' + rowsIndex);
			$(this).attr('taskindex', rowsIndex);
			var subtaskCount = $(this).attr('subtaskcount');
			for (var i = 1; i < subtaskCount; i++) {
				RecoundIdsForSubtasksRows(+oldTaskIndex, +rowsIndex);
			}			
			
			rowsIndex++;
		}
	);
			
	return --rowsIndex;
}

function RecoundIdsForSubtasksRows(taskIndex, newTaskIndex) {
	subtaskIndex = 0;	
	
	var realIndex = (newTaskIndex === undefined) ? taskIndex : newTaskIndex;

	$('[id^="trTimeChecker' + taskIndex + '"]').each(
		function() {
			$(this).find('.subtaskTd [idtype]').each(function() {
				var idType = $(this).attr('idtype');
				var id = idType + realIndex + '-' + subtaskIndex;
				$(this).attr('id', id);					
			});
			
			$(this).attr('taskindex', realIndex);
			
			if ($(this).hasClass('subtask')) {
				$(this).attr('id', 'trTimeChecker' + realIndex + '-' + subtaskIndex);
				$(this).attr('subtaskindex', subtaskIndex);
			}
			
			subtaskIndex++;
		}
	);	
	
	return subtaskIndex;
}

function CheckRowsNumber(lastRowIndex) {
	var mainRow = $('#trTimeChecker' + lastRowIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	
	var isAnyInputHasVal = ($('#inputTask' + lastRowIndex).val() != '');
	for (var i = 0; i < subtaskCount; i++) {
		isAnyInputHasVal = isAnyInputHasVal 
			|| ($('#inputComment' + lastRowIndex + '-' + i).val() != '')
			|| ($('#inputTime' + lastRowIndex + '-' + i).val() != '');
	}
	
	if (isAnyInputHasVal && $('#trTimeChecker' + (lastRowIndex + 1)).length <= 0) 
	{		
		var selector = '#trTimeChecker' + lastRowIndex;
		var lastSubtaskIndex = +$(selector).attr('subtaskcount') - 1;
		if (lastSubtaskIndex != 0) {
			selector += '-' + lastSubtaskIndex;
		}
		$(selector).after(CreateEmptyTimeCheckingRow(++lastRowIndex));
	} else {
		for (var i = 0; i < lastRowIndex; i++) {
			var currentRow = $('#trTimeChecker' + i);
			var subtaskCount = currentRow.attr('subtaskcount');
	
			var isAnyInputHasValIndex = ($('#inputTask' + i).val() != '');
			for (var j = 0; j < subtaskCount; j++) {
				isAnyInputHasValIndex = isAnyInputHasValIndex 
					|| ($('#inputComment' + i + '-' + j).val()  != '')
					|| ($('#inputTime' + i + '-' + j).val() != '');
			}			
			
			if (!isAnyInputHasValIndex) {
				$('[idtype=trTimeChecker][taskindex=' + i + ']').remove();
			}				
		}
	}	
	
	return lastRowIndex;
}

function ShiftSubtask(taskIndex) {
	var mainRow = $('#trTimeChecker' + taskIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	var previousRow = mainRow;
	
	for (var i = 1; i < subtaskCount; i++) {
		var currentRow = $('#trTimeChecker' + taskIndex + '-' + i);
		var previousSubtaskTds = previousRow.find('td.subtaskTd');
		currentRow.find('td.subtaskTd').each(function(index) {
			$(previousSubtaskTds[index]).children('input').val($(this).children('input').val());
		})
		
		previousRow = currentRow;
	}
	
	currentRow.remove();
}

$(document).ready ( function() {
	
	
	var rowsIndex = 0;
	var firstRow = CreateEmptyTimeCheckingRow(+rowsIndex);
	$('table.full-size tr[id]').not('.future').last().after(firstRow);
	
	$(document).on('propertychange input change keyup paste click', '[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]',
		function() 
		{	
			rowsIndex = CheckRowsNumber(rowsIndex);		
			rowsIndex = RecoundIds();
		}
	);
	
	$(document).on('click', '[idtype="buttonDeleteTask"]', 
		function() {	

			var mainTr = $(this).parent().parent();
			$('.subtask[id^="' + mainTr.attr('idtype') + mainTr.attr('taskindex') + '"]').remove();
			mainTr.find('[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]').val('');
			
			
			if (rowsIndex == 0)
				return;
			
			mainTr.remove();
			
			rowsIndex = RecoundIds();			
			rowsIndex = CheckRowsNumber(rowsIndex);	
		}	
	);
	
	$(document).on('click', '[idtype="buttonAddSubtask"]', 
		function() {
			var indexes = $(this).attr('id').replace('buttonAddSubtask', '');
			var taskStrIndex = indexes.indexOf('-');
			var taskIndex = indexes.substr(0, taskStrIndex);
			//var subtaskIndex = indexes.substr(taskStrIndex + 1);
			
			var mainRow = $('#trTimeChecker' + taskIndex);
			var newSubtaskIndex = mainRow.attr('subtaskcount');
			var tr = $(this).parent().parent();		
			tr.after(CreateSubtaskRow(+taskIndex, +newSubtaskIndex));
			
			mainRow.attr('subtaskcount', +newSubtaskIndex + 1);
			mainRow.children('td').first().attr('rowspan', +newSubtaskIndex + 1);			
			mainRow.children('td').last().attr('rowspan', +newSubtaskIndex + 1);
			
			RecoundIdsForSubtasksRows(+taskIndex);
		}	
	);
	
	$(document).on('click', '[idtype="buttonCloseSubtask"]', 
		function() {
			var indexes = $(this).attr('id').replace('buttonCloseSubtask', '');
			var taskStrIndex = indexes.indexOf('-');
			var taskIndex = indexes.substr(0, taskStrIndex);
			
			var mainRow = $('#trTimeChecker' + taskIndex);
			var currentRow = $(this).parent().parent();
			currentRow.find('[idtype="inputComment"], [idtype="inputTime"]').val("");
			var subtaskCount = mainRow.attr('subtaskcount');
			
			if (subtaskCount == 1) {
				rowsIndex = CheckRowsNumber(rowsIndex);		
				rowsIndex = RecoundIds();
				return;
			}
			
			if (currentRow.attr('id') == 'trTimeChecker' + taskIndex) {
				ShiftSubtask(taskIndex);
			} else {
				currentRow.remove();	
			}
			
			
			mainRow.attr('subtaskcount', +subtaskCount - 1);
			mainRow.children('td').first().attr('rowspan', +subtaskCount - 1);			
			mainRow.children('td').last().attr('rowspan', +subtaskCount - 1);
						
			RecoundIdsForSubtasksRows(+taskIndex);
			
			rowsIndex = CheckRowsNumber(rowsIndex);		
			rowsIndex = RecoundIds();
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
		}
	);
	
	$(document).on('click', '[idtype="buttonTimeStop"]', 
		function() {
			var currentDate = new Date();
			var time = currentDate.getHours() + ":" + currentDate.getMinutes(); // + "." + currentDate.getSeconds();
			
			var mainRow = $(this).parent().parent();
			mainRow.find('td.finishTime').text(time);
			var input = mainRow.find('[idtype=inputTime]');
			if (input.val()) {
				input.val(SumOfTime(DifferenceOfTime(mainRow.find('td.finishTime').text(), mainRow.find('td.startTime').text()), input.val()));
			} else {
				input.val(DifferenceOfTime(mainRow.find('td.finishTime').text(), mainRow.find('td.startTime').text()));
			}
			
			rowsIndex = CheckRowsNumber(rowsIndex);		
			rowsIndex = RecoundIds();
			
			$(this).hide();
			var startId = '#' + $(this).attr('id').replace('Stop', 'Start');
			$(startId).show();
			mainRow.removeClass('inProgress');
		}
	);
	
});