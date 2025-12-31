
import { CppProject } from './types';

export const PROJECTS: CppProject[] = [
  {
    id: 'student-mgmt',
    title: 'Student Management System',
    description: 'A robust CLI application to manage student records using File I/O and standard library containers.',
    concept: 'Classes, Vectors, File Handling',
    difficulty: 'Beginner',
    skills: ['CRUD Operations', 'File Persistence', 'Data Structuring'],
    code: `#include <iostream>
#include <vector>
#include <string>
#include <fstream>

using namespace std;

class Student {
public:
    int id;
    string name;
    float grade;

    void display() {
        cout << "ID: " << id << " | Name: " << name << " | Grade: " << grade << endl;
    }
};

void saveToFile(const vector<Student>& students) {
    ofstream file("students.txt");
    for (const auto& s : students) {
        file << s.id << " " << s.name << " " << s.grade << "\\n";
    }
}

int main() {
    vector<Student> database;
    int choice;

    while (true) {
        cout << "\\n--- Student Management System ---\\n";
        cout << "1. Add Student\\n2. List Students\\n3. Exit\\nChoice: ";
        cin >> choice;

        if (choice == 1) {
            Student s;
            cout << "Enter ID, Name, Grade: ";
            cin >> s.id >> s.name >> s.grade;
            database.push_back(s);
            saveToFile(database);
        } else if (choice == 2) {
            for (auto& s : database) s.display();
        } else break;
    }
    return 0;
}`,
    terminalOutput: `--- Student Management System ---
1. Add Student
2. List Students
3. Exit
Choice: 1
Enter ID, Name, Grade: 101 Alex 88.5
Student added successfully!

Choice: 2
ID: 101 | Name: Alex | Grade: 88.5`,
    readme: `# Student Management System
A foundational project demonstrating the use of C++ classes and file storage.

### Key Features
- **Data Encapsulation**: Student data is bundled in a class.
- **Dynamic Storage**: Uses \`std::vector\` for flexible list management.
- **Persistence**: Saves state to \`students.txt\` so data persists after restart.`
  },
  {
    id: 'library-mgmt',
    title: 'Library System',
    description: 'An object-oriented approach to managing book inventories and lending status.',
    concept: 'Pointers, Arrays, Loops',
    difficulty: 'Beginner',
    skills: ['Logical Control Flow', 'Arrays', 'Basic UI Design'],
    code: `#include <iostream>
#include <string>

using namespace std;

struct Book {
    int id;
    string title;
    bool isIssued;
};

int main() {
    Book library[100];
    int bookCount = 0;
    
    // Add dummy data
    library[bookCount++] = {1, "The C++ Primer", false};
    library[bookCount++] = {2, "Effective C++", true};

    cout << "Welcome to CLI Library\\n";
    cout << "Available Books:\\n";
    for(int i=0; i < bookCount; i++) {
        cout << library[i].id << ". " << library[i].title 
             << (library[i].isIssued ? " [Lent]" : " [Available]") << endl;
    }

    return 0;
}`,
    terminalOutput: `Welcome to CLI Library
Available Books:
1. The C++ Primer [Available]
2. Effective C++ [Lent]`,
    readme: `# Library Management System
Demonstrates structured data handling using C++ structs and arrays.

### Learnings
- **Arrays**: Fixed-size memory allocation for data sets.
- **Loops**: Iterating through collection to display status.
- **Conditionals**: Handling business logic for book lending.`
  },
  {
    id: 'timetable-mgr',
    title: 'Timetable Manager',
    description: 'A scheduling tool that uses 2D arrays to represent a weekly schedule.',
    concept: 'Multi-dimensional Arrays, Logic',
    difficulty: 'Intermediate',
    skills: ['2D Mapping', 'Matrix Manipulation', 'Input Validation'],
    code: `#include <iostream>
#include <string>

using namespace std;

const int DAYS = 5;
const int SLOTS = 4;

string timetable[DAYS][SLOTS];
string dayNames[] = {"Mon", "Tue", "Wed", "Thu", "Fri"};

void init() {
    for(int i=0; i<DAYS; i++)
        for(int j=0; j<SLOTS; j++)
            timetable[i][j] = "Empty";
}

int main() {
    init();
    timetable[0][0] = "CS101";
    timetable[2][1] = "Math202";

    cout << "Weekly Schedule:\\n";
    cout << "\\t";
    for(int s=0; s<SLOTS; s++) cout << "Slot " << s+1 << "\\t";
    cout << endl;

    for(int i=0; i<DAYS; i++) {
        cout << dayNames[i] << "\\t";
        for(int j=0; j<SLOTS; j++) {
            cout << timetable[i][j] << "\\t";
        }
        cout << endl;
    }
    return 0;
}`,
    terminalOutput: `Weekly Schedule:
        Slot 1  Slot 2  Slot 3  Slot 4
Mon     CS101   Empty   Empty   Empty
Tue     Empty   Empty   Empty   Empty
Wed     Empty   Math202 Empty   Empty
Thu     Empty   Empty   Empty   Empty
Fri     Empty   Empty   Empty   Empty`,
    readme: `# Timetable Manager
A practical tool for student organization using multi-dimensional data structures.

### Highlights
- **2D Arrays**: Perfect for representing schedules (Days vs. Time Slots).
- **Nested Loops**: Critical for rendering grid-based UI in terminal.`
  }
];
