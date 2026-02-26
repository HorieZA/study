import json
import os
from db import findOne, findAll, save

def empty():
  print("함수 정의가 되어 있지 않습니다.")
  
def select(args):
  sql = """
        SELECT
        `no`,
        `name`,
        `email`,
        `password`,
        `gender`,
        `delYn`,
        DATE_FORMAT(`regDate`, '%Y-%m-%d %H:%i:%s') AS regDate
        FROM edu.user
        """
  list = findAll(sql)
  print(f"번호\t이름\t이메일\t비밀번호\t성별\t탈퇴여부\t생성일자")
  print("-"*100)
  for row in list:
    print(f"{row["no"]}\t{row["name"]}\t{row["email"]}\t{row["password"]}\t{row["gender"]}\t{row["delYn"]}\t{row["regDate"]}\t")

def info(args):
  sql = f"""
        SELECT
        `no`,
        `name`,
        `email`,
        `password`,
        `gender`,
        `delYn`,
        DATE_FORMAT(`regDate`, '%Y-%m-%d %H:%i:%s') AS regDate
        FROM edu.user
        WHERE `no` = '{args.no}'
        """
  row = findOne(sql)
  print(f"번호\t이름\t이메일\t비밀번호\t성별\t탈퇴여부\t생성일자")
  print("-"*100)
  if row:
    print(f"{row['no']}\t{row["name"]}\t{row["email"]}\t{row["password"]}\t{row["gender"]}\t{row["delYn"]}\t{row["regDate"]}\t")
  else:
    print("등록된 정보가 없습니다.")


def insert(args):
  sql = f"""
        INSERT INTO edu.user (
        `name`, 
        `email`, 
        `password`, 
        `gender`) 
        VALUE (
        '{args.name}',
        '{args.email}',
        '{args.password}',
        '{args.gender}')
        """
  save(sql)
  select(None)
  
def update(args):
  sql = f"""
        UPDATE edu.user SET
        `name` = '{args.name}', 
        `email` = '{args.email}', 
        `password` = '{args.password}', 
        `gender`= '{args.gender}' 
        WHERE
        `no` = '{args.no}'
        """
  save(sql)
  select(None)
  
def delno(args):
  sql = f"""
        UPDATE edu.user SET
        `delYn` = '{args.delYn}'
        WHERE
        `no` = '{args.no}'
        """
  save(sql)
  select(None)
  
def delyes(args):
  sql = f"DELETE FROM edu.study WHERE `no` = {args.no}"
  save(sql)
  select(None)