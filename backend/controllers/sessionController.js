import asyncHandler from 'express-async-handler';
import Session from '../models/sessionModel.js';
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import differenceInMinutes from 'date-fns/differenceInMinutes'

// @desc    Create session
// @route   POST /api/session/create
// @access  Private
const createSession = asyncHandler(async (req, res) => {
    const sessionListLength = await Session.findOne({userId: req.user._id, endTime: null}).sort('-position');
    let position = 0;
    if(sessionListLength) {
        let currentPosition = sessionListLength.position
        position = currentPosition += 1
    }
    
    const session = await Session.create({
        userId: req.user._id,
        stopTime: null,
        duration: req.body.duration,
        type: req.body.type,
        description: req.body.description,
        position: position,
        emoji: req.body.emoji
    });
    const sessionList = await Session.find({userId: req.user._id, endTime: null}).sort('position');
    
      if (session) {
        res.status(201).json(sessionList)
      } else {
        res.status(404);
        throw new Error('Session not created');
      }
    });

// @desc    Start session
// @route   PUT /api/session/start
// @access  Private
const startSession = asyncHandler(async (req, res) => {
const session = await Session.findById(req.body.id);


if (session) {
    // Update the session with an end time
   session.startTime = new Date().toISOString();
    await session.save();
    const sessionList = await Session.find({userId: req.user._id, endTime: null}).sort('position');

   
   res.json(sessionList);
} else {
   res.status(404);
   throw new Error('Session not started');
}
});

// @desc    Delete session
// @route   DELETE /api/session/start
// @access  Private
const deleteSession = asyncHandler(async (req, res) => {
    const deletedSession = await Session.findByIdAndDelete(req.body.id)
    const sessionList = await Session.find({userId: req.user._id, endTime: null}).sort('position');

    
      if (deletedSession) {
        res.status(200).json(sessionList)
      } else {
        res.status(404);
        throw new Error('Session not deleted');
      }
    });

    // @desc    Get sessions
// @route   GET /api/session/all
// @access  Private
const getSessions = asyncHandler(async (req, res) => {
    const sessionList = await Session.find({userId: req.user._id, endTime: null}).sort('position');
    
    if (sessionList) {
        res.status(201).json(sessionList)
      } else {
        res.status(404);
        throw new Error('No sessions found');
      }
    });

// @desc    Get sessions from today
// @route   GET /api/session/today
// @access  Private
const getToday = asyncHandler(async (req, res) => {

  // get session numbers for all sessions for a user
    const totalSessionNumbers = await Session.aggregate([
        // First Stage
        {
          $match : { "$and" : [
            {"userId": req.user._id.toString()},
            {"createdAt": { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) }},
        ]}
        },
        // Second Stage
        {
          $group : {
            _id : { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
             totalDurationHours: { $sum: "$duration" },
            count: {$sum: 1}
          }
        }

       ])
      //  get sessions numbers for all completed sessions for a user
    const completedSessionNumbers = await Session.aggregate([
        // First Stage
        {
          $match : { "$and" : [
            {"userId": req.user._id.toString()},
            {"createdAt": { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) }},
            {"endTime": { $exists: true }},
        ]}
        },
        // Second Stage
        {
          $group : {
            _id : { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
             totalDurationHours: { $sum: "$duration" },
             actualDuration: { $sum: {$dateDiff: {startDate: { $dateFromString: {
                dateString: "$startTime"
            } }, endDate: { $dateFromString: {
                dateString: "$endTime"
            } }, unit: "second"}}},
            count: {$sum: 1}
          }
        }

       ])
      //  get sessions numbers for all incomplete sessions for a user

       const notCompletedSessionNumbers = await Session.aggregate([
        // First Stage
        {
          $match : { "$and" : [
            {"userId": req.user._id.toString()},
            {"createdAt": { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) }},
            {"endTime": { $exists: false }},
        ]}
        },
        // Second Stage
        {
          $group : {
            _id : { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
             totalDurationHours: { $sum: "$duration" },
             count: {$sum: 1}
          }
        }

       ])

    if (notCompletedSessionNumbers || completedSessionNumbers) {
        res.status(201).json({
            completedTotal: completedSessionNumbers?.[0]?.count ?? 0,
            notCompletedTotal: notCompletedSessionNumbers?.[0]?.count ?? 0 ,
            totalPlannedDurationMinutes: totalSessionNumbers?.[0]?.totalDurationHours,
            totalActualDurationSeconds: completedSessionNumbers?.[0]?.actualDuration,
        })
      } else {
        res.status(404);
        throw new Error('No sessions found');
      }
    });

// @desc    Stop session
// @route   PUT /api/session/stop
// @access  Private
const stopSession = asyncHandler(async (req, res) => {
    const session = await Session.findOne({userId: req.user._id, endTime: null});
    
    
    if (session) {
        // Update the session with an end time
        session.endTime = new Date().toISOString();
        await session.save();
        const sessionList = await Session.find({userId: req.user._id, endTime: null}).sort('position');
        
        res.json(sessionList);
    } else {
        res.status(404);
        throw new Error('Session not completed');
    }


});

// @desc    Edit session
// @route   PUT /api/session/edit
// @access  Private
const editSession = asyncHandler(async (req, res) => {
    const session = await Session.findById(req.body.id);

    
    
    if (session) {
        // Update the session with an end time
        session.description = req.body.description || session.description;
        session.duration = req.body.duration || session.duration;
        session.emoji = req.body.emoji || session.emoji;
        await session.save();
        const sessionList = await Session.find({userId: req.user._id, endTime: null}).sort('position');
        
        res.json(sessionList);
    } else {
        res.status(404);
        throw new Error('Session not found');
    }


});

export {
  startSession,
  stopSession,
  deleteSession,
  getSessions,
  createSession,
  editSession,
  getToday
};
