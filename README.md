# Checkpoint-2
A simple document management system

[![Build Status](https://travis-ci.org/andela-gike/Checkpoint-2.svg?branch=master)](https://travis-ci.org/andela-gike/Checkpoint-2)
[![Issue Count](https://codeclimate.com/github/andela-gike/Checkpoint-2/badges/issue_count.svg)](https://codeclimate.com/github/andela-gike/Checkpoint-2)
[![Code Climate](https://codeclimate.com/github/andela-gike/Checkpoint-2/badges/gpa.svg)](https://codeclimate.com/github/andela-gike/Checkpoint-2)
[![Coverage Status](https://coveralls.io/repos/github/andela-gike/Checkpoint-2/badge.svg?branch=master)](https://coveralls.io/github/andela-gike/Checkpoint-2?branch=master)


This Document Management System allows users to manage documents and the administrator to create and manage users & roles. Each User has a role while documents have owners and permissions. The Administrator can view all documents, however users can only view their own documents and public ones. The default permission for documents is public.

This is a system (API) that manages documents with types, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published and can have a type set for it. It is built with NodeJS, Express and Postgres.
Source code employs ES6 syntax traspiled down to ES5 using Babel.
