# Description

## Stack

A typescript application running on **Node.js** Engin, logging with **winston**, and testing with **jest**.

## Introduction

**Reactor Pattern** is used to avoid the blocking of the Input/Output operations. It provides us with a handler that is associated with I/O operations. When the I/O requests are to be generated, they get submitted to a demultiplexer, which handles concurrency in avoiding the blocking of the I/O mode and collects the requests in form of an event and queues those events. **Node.js** uses Reactor Pattern, to handel the concurrency of I/O and none I/O operations.

The **Node.js** API provides several ways of scheduling code to execute at some point after the present moment. `setTimeout()` can be used to schedule code execution after a designated amount of milliseconds. This function is similar to window.`setTimeout()` from the browser JavaScript API, however a string of code cannot be passed to be executed.

I make use of **Reactor Pattern** and `setTimeout()` to handel the cron scheduler concurrency.
Simply:

- A cron scheduler is list of active jobs executed periodically according to time interval.
- Each job has a time interval represent frequency of execution by use of`setTimeout()`
- Each job has a handler async function get invoked after time interval pass
  Jobs run forever until cron scheduler is stopped/ cleared or the job deleted

## Reasoning

Node.js helps in executing non blocking I/O operations concurrently. The challenge was in controlling and validating the executed jobs. Keep track of timeOuts is important to avoid timers hassle.

## Trade-offs

Assume that each job is totally independent, in storage and execution from other jobs.

## Possible future improvements

- Manage dependencies between jobs
- Mange shared storage between jobs

## Run project

- install latest Node.js on the machine
- download repo
- run npm install
- Test: npm test
- Run: npm start
