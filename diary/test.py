listened = []
listened_str = []
def main():
    info = str(input()).split()
    if info[1] == 0:
        return print('YES')

    if info[1] >= info[0]:
        return print('NO')

    for _ in range (int(info[1])):
        lection_str = str(input())
        listened_str.append(lection_str[::-1])
        lection = lection_str.split()
        if ((lection[1] in listened) | (len(listened) == 0)):
            if(lection_str in listened_str):
                return print('NO')
            listened.append(lection[0])
        else:
            return print('NO')

    return print('YES')



if __name__ == "__main__":
    main()