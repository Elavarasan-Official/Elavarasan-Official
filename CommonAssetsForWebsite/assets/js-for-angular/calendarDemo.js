/**
* calendarDemoApp - 0.9.0

var calendarDemoApp = angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap', 'ng']);
calendarDemoApp.directive('draggableEvents', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        link: function link(scope, iElement, iAttrs) {
            $timeout(function () {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    // use the element's Attr id as the event title
                    id: iAttrs.templateid
                };
                // store the Event Object in the DOM element so we can get to it later
                iElement.data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                iElement.draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
            }, 100);
        }
    }
} ]);*/
app.controller('CalendarCtrl',
   function ($scope, $compile, $timeout, uiCalendarConfig, $http, $filter, $window) {
       /*Changed nextDayThreshold:"05:00:00" in Event Rendering Options in fullcalendar.min.js*/
       /*Planner Local & Scope Variables*/
       var date = new Date();
       var d = date.getDate();
       var m = date.getMonth();
       var y = date.getFullYear();
       $scope.eventpopuptitle = "New Event";
       $scope.eventtemplatepopuptitle = "New Template";
       $scope.events = [];
       $scope.eventsbymonth = [];
       $scope.eventsbyconflicts = [];
       $scope.Eventname = '';
       $scope.EventCode = '';
       $scope.EventTypeList = [];
       $scope.EventStatusList = [];
       $scope.ParticipantsTypesList = [];
       $scope.TeamDetailList = [];
       $scope.ParticipantsList = [];
       $scope.GridDetails = [];
       $scope.SelectedParticipantsList = [];
       $scope.selectedTeam = {};
       $scope.EventTemplateList = [];
       $scope.MinEndTime = 0;
       $scope.selectedEventtype = '';
       $scope.startdate = '';
       $scope.starttime = '';
       $scope.enddate = '';
       $scope.endtime = '';
       $scope.selectedEventStatus = '';
       $scope.Comments = '';

       /*Event & Template Data Init Function*/
       $scope.PageInit = function () {
		   //uiCalendarConfig.calendars.myCalendar3.fullCalendar('changeView', 'month');
           //uiCalendarConfig.calendars.myCalendar3.fullCalendar('gotoDate', '2014-05-01');
           var httpreq = {
               method: 'GET',
               url: 'Planner_Service/APTService.svc/InitPlanner',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: {}
           }
           $http(httpreq).success(function (response) {
               $scope.EventTypeList = response.ListEventTypeDetails;
               $scope.EventStatusList = response.ListEventStatusDetails;
               $scope.ParticipantsTypesList = response.ListParticipantsTypeDetails;
               $scope.EventTemplateList = response.ListEventTemplateDetails;
           })
       };
       $scope.PageInit();

       /*Event & Template Participant Types Selection Change Function*/
       $scope.ParticipantsSelectionChange = function () {
           var httpreq = {
               method: 'POST',
               url: 'Planner_Service/APTService.svc/FetchEventTemplateParticipants',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: { ParticipantType: $scope.selectedParticipantTypes.ParticipantTypecode }
           }
           $http(httpreq).success(function (response) {
               if ($scope.selectedParticipantTypes.ParticipantTypecode == "MSC338") {
                   $scope.TeamDetailList = response.ListPlayerTeamDetails;
                   $scope.ParticipantsList = [];
               }
               else {
                   $scope.ParticipantsList = response.ListParticipantsDetails;
                   $scope.TeamDetailList = [];
               }
           })
       };

       /*Event & Template Team Selection Change Event*/
       $scope.TeamSelectionChange = function (events) {
           var httpreq = {
               method: 'POST',
               url: 'Planner_Service/APTService.svc/FetchEventTemplatePlayerDetails',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: { TeamCode: $scope.selectedTeam.Teamcode }
           }
           $http(httpreq).success(function (response) {
               $scope.ParticipantsList = response.ListParticipantsDetails;
           })
       };

       /*Event & Template Add Participants Function which includes checking availability of participants*/
       $scope.Add = function (EventInvoker) {
           var ErrorMessages = $scope.ValidateAddEvent(EventInvoker);
           if (ErrorMessages.length == 0) {
               var ParticipantsType = angular.copy($scope.selectedParticipantTypes);
               var Teams = angular.copy($scope.selectedTeam);
               angular.forEach($scope.SelectedParticipantsList, function (data) {
                   var addToArray = true;
                   for (var i = 0; i < $scope.GridDetails.length; i++) {
                       if ($scope.GridDetails[i].Participantcode == data.Participantcode) {
                           addToArray = false;
                           $window.alert('Participant ' + data.Participantname + ' already exists.');
                       }
                   }
                   if (addToArray) {
                       if (EventInvoker == 'Event') {
                           var httpreq = {
                               method: 'POST',
                               url: 'Planner_Service/APTService.svc/ValidateEventParticipants',
                               headers: {
                                   'Content-Type': 'application/json; charset=utf-8',
                                   'dataType': 'json'
                               },
                               data: {
                                   StartDate: $scope.startdate, EndDate: $scope.enddate, StartTime: $scope.starttime,
                                   EndTime: $scope.endtime, ParticipantCode: data.Participantcode
                               }
                           };
                           $http(httpreq).success(function (response) {
                               $scope.GridDetails.push({
                                   EventParticipantCode: '',
                                   ParticipantTypecode: ParticipantsType.ParticipantTypecode,
                                   ParticipantTypename: ParticipantsType.ParticipantTypename,
                                   Participantcode: data.Participantcode,
                                   Participantname: data.Participantname,
                                   TeamCode: ParticipantsType.ParticipantTypecode == 'MSC338' ? Teams.Teamcode : '',
                                   Teamname: ParticipantsType.ParticipantTypecode == 'MSC338' ? Teams.Teamname : '',
                                   RecordStatus: 'MSC001',
                                   IsAvailable: (response.lstEventParticipantsDetailsByConflicts.length == 0) ? 'YES' : 'NO',
                                   IsAvailableEvent: (response.lstEventParticipantsDetailsByConflicts.length == 0) ? '' : response.lstEventParticipantsDetailsByConflicts[0].EventName,
                                   IsAvailableStartDate: (response.lstEventParticipantsDetailsByConflicts.length == 0) ? '' : response.lstEventParticipantsDetailsByConflicts[0].StartDate,
                                   IsAvailableStartTime: (response.lstEventParticipantsDetailsByConflicts.length == 0) ? '' : response.lstEventParticipantsDetailsByConflicts[0].StartTime
                               });
                           });
                       }
                       else {
                           $scope.GridDetails.push({
                               EventParticipantCode: '',
                               ParticipantTypecode: ParticipantsType.ParticipantTypecode,
                               ParticipantTypename: ParticipantsType.ParticipantTypename,
                               Participantcode: data.Participantcode,
                               Participantname: data.Participantname,
                               TeamCode: ParticipantsType.ParticipantTypecode == 'MSC338' ? Teams.Teamcode : '',
                               Teamname: ParticipantsType.ParticipantTypecode == 'MSC338' ? Teams.Teamname : '',
                               RecordStatus: 'MSC001',
                               IsAvailable: 'YES',
                               IsAvailableEvent: '',
                               IsAvailableStartDate: '',
                               IsAvailableStartTime: ''
                           });
                       }
                   }
               });
               $scope.selectedParticipantTypes = {};
               $scope.selectedTeam = {};
               angular.forEach($scope.ParticipantsList, function (value, key) {
                   value.ticked = false;
               });
           }
           else {
               $window.alert(ErrorMessages);
           }
       };

       /*Event & Template Add Participants Validating Function*/
       $scope.ValidateAddEvent = function (EventInvoker) {
           var ErrorMessages = '';
           if ($scope.Eventname.length == 0)
               ErrorMessages = 'Please enter Event Name.';
           if ($scope.selectedEventtype.length == 0)
               ErrorMessages += '\nPlease select Event Type.';
           if (EventInvoker == 'Event') {
               if (!moment($scope.startdate, "DD/MM/YYYY").isValid())
                   ErrorMessages += '\nPlease select Start Date.';
               if (!moment($scope.starttime, "hh:mm A").isValid())
                   ErrorMessages += '\nPlease select Start Time.';
               if (!moment($scope.enddate, "DD/MM/YYYY").isValid())
                   ErrorMessages += '\nPlease select End Date.';
               if (!moment($scope.endtime, "hh:mm A").isValid())
                   ErrorMessages += '\nPlease select End Time.';
               if (moment($scope.startdate, "DD/MM/YYYY").isValid() && moment($scope.starttime, "hh:mm A").isValid() && moment($scope.enddate, "DD/MM/YYYY").isValid() && moment($scope.endtime, "hh:mm A").isValid())
                   if (moment($scope.startdate + ' ' + $scope.starttime, "DD/MM/YYYY hh:mm A").isAfter(moment($scope.enddate + ' ' + $scope.endtime, "DD/MM/YYYY hh:mm A")))
                       ErrorMessages += '\nPlease select End Date & Time greater than Start Date & Time.';
           }
           if ($scope.selectedEventStatus.length == 0)
               ErrorMessages += '\nPlease select Event Status.';
           if ($scope.Comments.length == 0)
               ErrorMessages += '\nPlease select Comments.';
           if ($scope.SelectedParticipantsList.length == 0)
               ErrorMessages += '\nPlease Select Participants.';
           return ErrorMessages;
       };

       /*Event & Template Submit Validating Function*/
       $scope.ValidateSubmitEvent = function (EventInvoker) {
           var ErrorMessages = '';
           if ($scope.Eventname.length == 0)
               ErrorMessages = 'Please enter Event Name.';
           if ($scope.selectedEventtype.length == 0)
               ErrorMessages += '\nPlease select Event Type.';
           if (EventInvoker == 'Event') {
               if (!moment($scope.startdate, "DD/MM/YYYY").isValid())
                   ErrorMessages += '\nPlease select Start Date.';
               if (!moment($scope.starttime, "hh:mm A").isValid())
                   ErrorMessages += '\nPlease select Start Time.';
               if (!moment($scope.enddate, "DD/MM/YYYY").isValid())
                   ErrorMessages += '\nPlease select End Date.';
               if (!moment($scope.endtime, "hh:mm A").isValid())
                   ErrorMessages += '\nPlease select End Time.';
               if (moment($scope.startdate, "DD/MM/YYYY").isValid() && moment($scope.starttime, "hh:mm A").isValid() && moment($scope.enddate, "DD/MM/YYYY").isValid() && moment($scope.endtime, "hh:mm A").isValid())
                   if (moment($scope.startdate + ' ' + $scope.starttime, "DD/MM/YYYY hh:mm A").isAfter(moment($scope.enddate + ' ' + $scope.endtime, "DD/MM/YYYY hh:mm A")))
                       ErrorMessages += '\nPlease select End Date & Time greater than Start Date & Time.';
           }
           if ($scope.selectedEventStatus.length == 0)
               ErrorMessages += '\nPlease select Event Status.';
           if ($scope.Comments.length == 0)
               ErrorMessages += '\nPlease select Comments.';
           if ($scope.GridDetails.length == 0)
               ErrorMessages += '\nPlease Select Participants.';
           return ErrorMessages;
       };

       /*Event & Template Clear Function*/
       $scope.Clear = function () {
           var calendar_events = angular.copy($scope.events);
           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('removeEvents');
           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('addEventSource', calendar_events);
           $scope.Eventname = '';
           $scope.startdate = '';
           $scope.enddate = '';
           $scope.starttime = '';
           $scope.endtime = '';
           $scope.selectedEventtype = '';
           $scope.selectedEventStatus = '';
           $scope.Comments = '';
           $scope.selectedParticipantTypes = {};
           $scope.selectedTeam = {};
           angular.forEach($scope.ParticipantsList, function (value, key) {
               value.ticked = false;
           });
           $scope.GridDetails = [];
           $scope.EventCode = '';
           $scope.eventpopuptitle = "New Event";
           $scope.eventtemplatepopuptitle = "New Template";
       };

       /*Event Template Save Function*/
       $scope.TemplateSave = function (EventInvoker) {
           var ErrorMessages = $scope.ValidateSubmitEvent(EventInvoker);
           if (ErrorMessages.length == 0) {
               var httpreq = {
                   method: 'POST',
                   url: 'Planner_Service/APTService.svc/InsertEventTemplateDetails',
                   headers: {
                       'Content-Type': 'application/json; charset=utf-8',
                       'dataType': 'json'
                   },
                   data: { EventName: $scope.Eventname, EventTypeCode: $scope.selectedEventtype, EventStatusCode: $scope.selectedEventStatus,
                       Comments: $scope.Comments, lstEventTemplateParticipants: $scope.GridDetails
                   }
               };
               $http(httpreq).success(function (response) {
                   if (response.result == true) {
                       alert("Template has been successfully Inserted");
                       $('#eventtemplate-modal').modal('toggle');
                       $scope.Clear();
                       $scope.EventTemplateList = response.ListEventTemplateDetails;
                   }
               });
           }
           else {
               $window.alert(ErrorMessages);
           }
       };

       /*Event Template Delete Function*/
       $scope.TemplateDelete = function (TemplateCode) {
           if ($window.confirm("Do you want delete Template?")) {
               var httpreq = {
                   method: 'POST',
                   url: 'Planner_Service/APTService.svc/DeleteEventTemplateDetails',
                   headers: {
                       'Content-Type': 'application/json; charset=utf-8',
                       'dataType': 'json'
                   },
                   data: { TemplateCode: TemplateCode }
               };
               $http(httpreq).success(function (response) {
                   if (response.result == true) {
                       $scope.EventTemplateList = response.ListEventTemplateDetails;
                       alert("Template has been successfully Deleted");
                   }
               });
           }
       };

       /*Event Participants Delete Function*/
       $scope.ParticipantDelete = function (ParticipantDetails) {
           if ($window.confirm("Do you want delete Participant?")) {
               var index = $scope.GridDetails.indexOf(ParticipantDetails);
               $scope.GridDetails.splice(index, 1);
               alert("Template has been successfully Deleted");
           }
       };

       /*Event Save & Update Function*/
       $scope.EventSave = function (EventInvoker) {
           var ErrorMessages = $scope.ValidateSubmitEvent(EventInvoker);
           if (ErrorMessages.length == 0) {
               if ($scope.EventCode == null || $scope.EventCode.length == 0) {
                   var httpreq = {
                       method: 'POST',
                       url: 'Planner_Service/APTService.svc/InsertEventDetails',
                       headers: {
                           'Content-Type': 'application/json; charset=utf-8',
                           'dataType': 'json'
                       },
                       data: {
                           EventName: $scope.Eventname, StartDate: $scope.startdate, EndDate: $scope.enddate,
                           StartTime: $scope.starttime, EndTime: $scope.endtime, EventTypeCode: $scope.selectedEventtype,
                           EventStatusCode: $scope.selectedEventStatus, Comments: $scope.Comments,
                           lstEventTemplateParticipants: $scope.GridDetails
                       }
                   };
                   $http(httpreq).success(function (response) {
                       if (response.result == true) {
                           alert("Event has been planned successfully");
                           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('removeEvents');
                           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('addEventSource', $scope.eventsF);
                           $('#event-modal').modal('toggle');
                           $scope.Clear();
                       }
                   });
               }
               else {
                   var httpreq = {
                       method: 'POST',
                       url: 'Planner_Service/APTService.svc/UpdateEventDetails',
                       headers: {
                           'Content-Type': 'application/json; charset=utf-8',
                           'dataType': 'json'
                       },
                       data: {
                           EventCode: $scope.EventCode, EventName: $scope.Eventname, StartDate: $scope.startdate, EndDate: $scope.enddate,
                           StartTime: $scope.starttime, EndTime: $scope.endtime, EventTypeCode: $scope.selectedEventtype,
                           EventStatusCode: $scope.selectedEventStatus, Comments: $scope.Comments,
                           lstEventTemplateParticipants: $scope.GridDetails
                       }
                   };
                   $http(httpreq).success(function (response) {
                       if (response.result == true) {
                           alert("Event has been modified successfully");
                           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('removeEvents');
                           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('addEventSource', $scope.eventsF);
                           $('#event-modal').modal('toggle');
                           $scope.Clear();
                       }
                   });
               }
           }
           else {
               $window.alert(ErrorMessages);
           }
       };

       /*Event Delete Function*/
       $scope.EventDelete = function () {
           if ($window.confirm("Do you want delete Event?")) {
               var httpreq = {
                   method: 'POST',
                   url: 'Planner_Service/APTService.svc/DeleteEventDetails',
                   headers: {
                       'Content-Type': 'application/json; charset=utf-8',
                       'dataType': 'json'
                   },
                   data: { EventCode: $scope.EventCode }
               };
               $http(httpreq).success(function (response) {
                   if (response.result == true) {
                       alert("Event has been removed successfully");
                       uiCalendarConfig.calendars['myCalendar3'].fullCalendar('removeEvents');
                       uiCalendarConfig.calendars['myCalendar3'].fullCalendar('addEventSource', $scope.eventsF);
                       $('#event-modal').modal('toggle');
                       $scope.Clear();
                   }
               });
           }
       };

       /*Event Type Filter Change*/
       $scope.EventTypeFilterChange = function (Eventtype) {
           var calendar_events = $filter('filter')($scope.events, Eventtype);
           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('removeEvents');
           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('addEventSource', calendar_events);
       };

       /* event source that calls a function on every view switch */
       $scope.eventsF = function (start, end, timezone, callback) {
           var httpreq = {
               method: 'POST',
               url: 'Planner_Service/APTService.svc/FetchEventDetails',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: { start: start.format('MM-DD-YYYY h:mm:ss a'), end: end.format('MM-DD-YYYY h:mm:ss a') }
           }
           $http(httpreq).success(function (response) {
			   $scope.events = response.lstEventDetailsEntity;
               $scope.eventsbymonth = response.lstEventDetailsByMonth;
               $scope.eventsbyconflicts = response.lstEventDetailsByConflicts;
               uiCalendarConfig.calendars['myCalendar3'].fullCalendar('removeEvents');
               callback($filter('filter')(response.lstEventDetailsEntity, $scope.selectedFilterEventtype == null ? '' : $scope.selectedFilterEventtype));
           })
       };
       /* click on createNewTemplate */
       $scope.createNewTemplateSelect = function () {
           $scope.eventtemplatepopuptitle = "New Template";
           $('#eventtemplate-modal').modal({
               backdrop: 'static'
           });
       };
       /* Event on eventSelect */
       $scope.alertOnEventSelect = function (start, end, allDay) {
           $scope.eventpopuptitle = "New Event";
           $scope.startdate = start.format("DD/MM/YYYY");
           $scope.enddate = start.format("DD/MM/YYYY");
           $('#event-modal').modal({
               backdrop: 'static'
           });
       };
       /* Event on eventClick */
       $scope.alertOnEventClick = function (date, jsEvent, view) {
           var httpreq = {
               method: 'POST',
               url: 'Planner_Service/APTService.svc/FetchEventDetailsBasedOnEventCode',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: { EventCode: date.id, IntervalDuration: 0, IsDrop: false }
           };
           $http(httpreq).success(function (response) {
               $scope.GridDetails = response.ListEventTemplateParticipantsDetails;
               angular.forEach(response.ListEventTemplateDetails, function (data) {
                   $scope.Eventname = data.EventName;
                   $scope.EventCode = data.EventCode;
                   $scope.selectedEventtype = data.EventTypeCode;
                   $scope.selectedEventStatus = data.EventStatusCode;
                   $scope.Comments = data.Comments;
                   $scope.startdate = data.StartDate;
                   $scope.enddate = data.EndDate;
                   $scope.starttime = data.StartTime;
                   $scope.endtime = data.EndTime;
               });
               $scope.eventpopuptitle = "Modify Event";
               $('#event-modal').modal({
                   backdrop: 'static'
               });
           });
       };
       /* Event on Internal Drop */
       $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
           var httpreq = {
               method: 'POST',
               url: 'Planner_Service/APTService.svc/FetchEventDetailsBasedOnEventCode',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: { EventCode: event.id, IntervalDuration: delta.asMilliseconds(), IsDrop: true }
           };
           $http(httpreq).success(function (response) {
               $scope.GridDetails = response.ListEventTemplateParticipantsDetails;
               angular.forEach(response.ListEventTemplateDetails, function (data) {
                   $scope.Eventname = data.EventName;
                   $scope.EventCode = data.EventCode;
                   $scope.selectedEventtype = data.EventTypeCode;
                   $scope.selectedEventStatus = data.EventStatusCode;
                   $scope.Comments = data.Comments;
                   $scope.startdate = data.StartDate;
                   $scope.enddate = data.EndDate;
                   $scope.starttime = data.StartTime;
                   $scope.endtime = data.EndTime;
               });
               $scope.eventpopuptitle = "Modify Event";
               $('#event-modal').modal({
                   backdrop: 'static'
               });
           });
       };
       /* Event on External Drop */
       $scope.alertOnExternalDrop = function (date, jsEvent, ui, resourceId) {
           $scope.eventpopuptitle = "New Event";
           $scope.startdate = date.format("DD/MM/YYYY");
           $scope.enddate = date.format("DD/MM/YYYY");
           var httpreq = {
               method: 'POST',
               url: 'Planner_Service/APTService.svc/FetchEventTemplateDetailsBasedOnTemplateCode',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: { TemplateCode: $(this).attr("data-templateid") }
           };
           $http(httpreq).success(function (response) {
               $scope.GridDetails = response.ListEventTemplateParticipantsDetails;
               angular.forEach(response.ListEventTemplateDetails, function (data) {
                   $scope.Eventname = data.EventName;
                   $scope.selectedEventtype = data.EventTypeCode;
                   $scope.selectedEventStatus = data.EventStatusCode;
                   $scope.Comments = data.Comments;
               });
               $('#event-modal').modal({
                   backdrop: 'static'
               });
           });
       };
       /* Event on Resize */
       $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
           var httpreq = {
               method: 'POST',
               url: 'Planner_Service/APTService.svc/FetchEventDetailsBasedOnEventCode',
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'dataType': 'json'
               },
               data: { EventCode: event.id, IntervalDuration: delta.asMilliseconds(), IsDrop: false }
           };
           $http(httpreq).success(function (response) {
               $scope.GridDetails = response.ListEventTemplateParticipantsDetails;
               angular.forEach(response.ListEventTemplateDetails, function (data) {
                   $scope.Eventname = data.EventName;
                   $scope.EventCode = data.EventCode;
                   $scope.selectedEventtype = data.EventTypeCode;
                   $scope.selectedEventStatus = data.EventStatusCode;
                   $scope.Comments = data.Comments;
                   $scope.startdate = data.StartDate;
                   $scope.enddate = data.EndDate;
                   $scope.starttime = data.StartTime;
                   $scope.endtime = data.EndTime;
               });
               $scope.eventpopuptitle = "Modify Event";
               $('#event-modal').modal({
                   backdrop: 'static'
               });
           });
       };

       /* Render Tooltip */
       $scope.eventRender = function (event, element, view) {
		   uiCalendarConfig.calendars['myCalendar3'].fullCalendar('changeView', 'month');
           uiCalendarConfig.calendars['myCalendar3'].fullCalendar('gotoDate', '2014-05-01');
           element.attr({ 'tooltip': event.title,
               'tooltip-append-to-body': true
           });
           $compile(element)($scope);
       };
       /* config calendar object */
       $scope.uiConfig = {
           calendar: {
               height: $(window).height(),
               handleWindowResize: true,
               editable: true,
               selectable: true,
               droppable: true,
               eventLimit: true,
               dropAccept: '.external-event',
               header: {
                   left: 'prev,next today',
                   center: 'title',
                   right: 'month,agendaWeek,agendaDay'
               },
			   //defaultDate : $.fullCalendar.moment('2014-05-01'),
               eventClick: $scope.alertOnEventClick,
               select: $scope.alertOnEventSelect,
               eventDrop: $scope.alertOnDrop,
               drop: $scope.alertOnExternalDrop,
               eventResize: $scope.alertOnResize,
               timezone: 'local',
               eventRender: $scope.eventRender
           }
       };
       /*$scope.eventSources2 = [$scope.eventsF];*/
   });
/* EOF */